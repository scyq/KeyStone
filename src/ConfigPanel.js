import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import WordsHandler from './WordsHandler';
import ColorThief from '../node_modules/colorthief/dist/color-thief';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttonPos: {
        position: "absolute",
        right: 3,
        bottom: 10
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));


const funcStep = 0;   /* 分析功能的步骤数 */
const colorStep = 1;  /* 分析颜色的步骤数 */
const hostURL = "http://127.0.0.1:9999/";   /* 主机IP */

export default function ConfigPanel(props) {

    const classes = useStyles();

    const steps = props.getSteps();

    const [wordsHandler] = useState(new WordsHandler());
    const [ifStartAnalysis, setIfStartAnalysis] = useState(false);  /* 是否开始分析 */
    const [funcInput, setFuncInput] = useState("");                 /* 更改用户功能需求输入 */
    const [colorStyleInput, setColorStyleInput] = useState("");     /* 获取用户对颜色需求的输入 */
    const [wishColor, setWishColor] = useState([]);                 /* 提取用户可能期待的颜色，这个不是最终的颜色 */



    /* 获取用户对功能需求的输入 */
    const funcDemandChange = (event) => {
        setFuncInput(event.target.value);
        props.setFunction(event.target.value);
    }

    /* 获取用户对颜色的输入 */
    const colorDemandChange = (event) => {
        setColorStyleInput(event.target.value);
    }

    /*
      @function splitSpeech
      更新类中的words并把词语和词性分开
      @param {Array{string}} theWords NLP处理后带有词性的词语数组
    */
    const splitSpeech = (theWords) => {
        return theWords.map(
            word => {
                return word.split('/');
            }
        );
    }

    /* 向本地端口发送get请求 */
    /*
      @function nlpSearchFunc 分析用户可能想要的功能，确定原始的布局、导航
      @param analysisDoneCallBack 回调函数，用于更新背景颜色
    */
    const nlpSearchFunc = (analysisDoneCallBack) => {
        if (funcInput.length <= 0) {
            analysisDoneCallBack();
            return;
        }

        fetch(props.hostURL + 'func?query=' + funcInput)
            .then(res => res.json())
            .then(data => {
                let funcData = splitSpeech(data);
                let AnalysisInfo = wordsHandler.Analysis(funcData, 0);
                props.setDesign(AnalysisInfo);
                analysisDoneCallBack();
            });
    }

    /* 向本地端口发送get请求 */
    /*
      @function nlpSearchColor 分析颜色并展示用户可能喜欢的颜色
      @param analysisDoneCallBack 回调函数，用于结束分析状态
    */
    const nlpSearchColor = (analysisDoneCallBack) => {
        if (colorStyleInput.length <= 0) {
            analysisDoneCallBack();
            setWishColor(["#ffffff"]);
            return;
        }
        fetch(hostURL + 'img?query=' + colorStyleInput)
            .then(res => res.json())
            .then(data => {
                /* 这里data是nlp处理完后还没有分词的数组 */
                setColorStyleInput(data);
                const colorThief = new ColorThief();
                const wordsCounts = data.length;

                /* rgb转十六进制 */
                const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
                    const hex = x.toString(16)
                    return hex.length === 1 ? '0' + hex : hex
                }).join('');

                let temp = [];
                if (data.length < 1) {
                    analysisDoneCallBack()
                    setWishColor(["#ffffff"]);
                }
                else {
                    for (let words of data) {
                        words = words.split('/');
                        const img = new Image();
                        /* 这是回调函数，当图片爬完了，就会调用 */
                        // eslint-disable-next-line
                        img.addEventListener('load', function () {
                            let rgb = colorThief.getColor(img);
                            let rgbHex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                            temp.push(rgbHex);
                            if (temp.length >= wordsCounts) {
                                analysisDoneCallBack();
                                /* 去重 */
                                temp = Array.from(new Set(temp));
                                setWishColor(temp);
                            }
                        });
                        img.crossOrigin = 'Anonymous';
                        try {
                            let srcPath = "http://localhost:9999/_image_cache_/" + words[0] + ".jpg";
                            img.src = srcPath;
                        }
                        catch
                        {
                            analysisDoneCallBack();
                        }
                    }
                }
            });
    };


    /*
  @function getStepContent
  返回Step组件不同步渲染的内容
*/
    function getStepContent(step) {
        switch (step) {
            case 0:
                // 模版选项
                return (
                    <div>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="funcInput"
                                label="输入您的主要应用场景"
                                name="funcInput"
                                autoComplete="funcInput"
                                autoFocus
                                onChange={funcDemandChange}
                            />
                        </form>
                    </div>
                );

            case 1:
                // 输入颜色风格
                return (
                    <div>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="colorInput"
                                label="输入您想要的风格配色"
                                name="colorInput"
                                autoComplete="colorInput"
                                autoFocus
                                onChange={colorDemandChange}
                            />
                        </form>
                    </div>
                );

            case 2:
                // 猜你喜欢的颜色搭配
                const colorBar = wishColor.map((rgb) => {
                    return (
                        <div key={rgb}>
                            <div style={{
                                backgroundColor: rgb,
                                height: '100px',
                                width: '100px',
                                padding: '20px',
                                position: "relative",
                                marginRight: "5px",
                                borderStyle: "solid"
                            }} >
                            </div>
                            <FormControlLabel
                                value={rgb}
                                control={
                                    <Switch
                                        color="primary"
                                        label={rgb}
                                    >
                                    </Switch>}
                                label={rgb}
                                labelPlacement="start"
                            >
                            </FormControlLabel>
                        </div>
                    );
                });
                return (
                    <div style={{ display: "flex" }}>
                        {colorBar}
                    </div>
                );

            case 3:
                // 其他需求声明
                return (
                    <div>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="otherDemand"
                                label="您其他的需求"
                                name="otherDemand"
                                autoComplete="otherDemand"
                                autoFocus
                                onChange={() => { }}
                            />
                        </form>
                    </div>
                );

            default:
                return (<div></div>);
        }
    }

    /* 如果index是颜色分析，则渲染颜色 */
    const handleNext = (index) => {
        if (index === funcStep) {
            setIfStartAnalysis(true);
            nlpSearchFunc(() => {
                setIfStartAnalysis(false);
                props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
            });
        }
        else if (index === colorStep) {
            setIfStartAnalysis(true);
            nlpSearchColor(() => {
                setIfStartAnalysis(false);
                props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
            });
        }
        // 倒数第二步点击，强制显示预览
        else if (index === steps.length - 2) {
            props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else {
            props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>

            <div>
                {getStepContent(props.activeStep)}
            </div>


            <div className={classes.buttonPos}>
                <Button
                    disabled={props.activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext(props.activeStep)}
                    className={classes.button}
                >
                    {props.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>

        </div>
    );
}