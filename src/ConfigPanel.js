import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from '@material-ui/core';
import nlpSearchFunc from './WebReq';
import { nlpSearchColor } from './WebReq';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '30%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));


const funcStep = 0;   /* 分析功能的步骤数 */
const colorStep = 1;  /* 分析颜色的步骤数 */

export default function ConfigPanel(props) {

    const classes = useStyles();

    const steps = props.getSteps();
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

    /* 分析结束后要做的事情 */
    const afterAnalysis = () => {
        setIfStartAnalysis(false);
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }


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
            nlpSearchFunc(funcInput, props.setDesign, afterAnalysis);
        }
        else if (index === colorStep) {
            setIfStartAnalysis(true);
            nlpSearchColor(colorStyleInput, setWishColor, afterAnalysis);
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

            <Backdrop className={classes.backdrop} open={ifStartAnalysis} >
                <CircularProgress color="inherit" />
            </Backdrop>

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