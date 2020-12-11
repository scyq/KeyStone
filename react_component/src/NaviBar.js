import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RadioGroup, Switch } from '@material-ui/core';
import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import WordsHandler from './WordsHandler';
import ColorThief from '../node_modules/colorthief/dist/color-thief';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


const hostURL = "http://127.0.0.1:9999/";
const funcStep = 0;   /* 分析功能的步骤数 */
const colorStep = 1;  /* 分析颜色的步骤数 */

function getSteps() {
  return ['请输入您主要的应用场景', '您想要什么样的风格配色？', '根据您的输入，我们推断您喜欢以下几种配色：', '您还有其他什么需求？'];
}

/*
  @function getStepHint
  根据引导的位置来获取引导的提示词
*/
function getStepHint(step) {
  switch (step) {
    case 0:
      return '只有自主设计模式支持输入，尝试输入"我想要一个放新闻的页面"';
    case 1:
      return '"我喜欢低调的商务风。"';
    case 2:
      return '选择您想要的组合。';
    case 3:
      return '例如您不喜欢我们给您预设的布局？';
    default:
      return '随便说点什么吧。'
  }
}

export default function NaviBar(props) {

  const [wordsHandler] = useState(new WordsHandler());
  const [activeStep, setActiveStep] = useState(0);
  const [templateChoice, setTemplateChoice] = useState(0);

  const [funcInput, setFuncInput] = useState("");                 /* 更改用户功能需求输入 */

  const [colorStyleInput, setColorStyleInput] = useState("");     /* 获取用户对颜色需求的输入 */

  const [ifStartAnalysis, setIfStartAnalysis] = useState(false);  /* 是否开始分析 */

  const [wishColor, setWishColor] = useState([]);                 /* 提取用户可能期待的颜色，这个不是最终的颜色 */
  const [appliedColor, setApplyColor] = useState(["White"]);             /* 最终应用的颜色，依赖于用户的选择 */

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      left: 0,
      background: appliedColor
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const steps = getSteps();
  const classes = useStyles();


  /* 获取用户对功能需求的输入 */
  const funcDemandChange = (event) => {
    setFuncInput(event.target.value);
    props.setFunction(event.target.value);
  }

  /* 获取用户对颜色的输入 */
  const colorDemandChange = (event) => {
    setColorStyleInput(event.target.value);
  }

  /* 处理用户模版的选择 */
  const handleTemplateChange = event => {
    let template = parseInt(event.target.value)
    setTemplateChoice(template);
    props.setTemplate(template);
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
            {/* 注意 value的值是string 需要转类型 */}
            <RadioGroup row aria-label="可参考的布局" value={templateChoice} onChange={handleTemplateChange}>
              <FormControlLabel value={0} control={<Radio />} label="自主设计模式" />
              <FormControlLabel value={1} control={<Radio />} label="相簿" />
              <FormControlLabel value={2} control={<Radio />} label="博客" />
              <FormControlLabel value={3} control={<Radio />} label="订单页" />
              <FormControlLabel value={4} control={<Radio />} label="仪表盘" />
              <FormControlLabel value={5} control={<Radio />} label="收银台" />
              <FormControlLabel value={6} control={<Radio />} label="登陆界面" />
              <FormControlLabel value={7} control={<Radio />} label="带侧页的登陆界面" />
              <FormControlLabel value={8} control={<Radio />} label="注册界面" />
              <FormControlLabel value={9} control={<Radio />} label="带固定页尾的页面" />
            </RadioGroup>
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
                disabled={!(templateChoice === 0)}
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

    fetch(hostURL + 'func?query=' + funcInput)
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


  /* 如果index是颜色分析，则渲染颜色 */
  const handleNext = (index) => {
    if (index === funcStep && templateChoice === 0) {
      setIfStartAnalysis(true);
      nlpSearchFunc(() => {
        setIfStartAnalysis(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
    }
    else if (index === colorStep) {
      setIfStartAnalysis(true);
      nlpSearchColor(() => {
        setIfStartAnalysis(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
    }
    // 倒数第二步点击，强制显示预览
    else if (index === steps.length - 2) {
      props.setDrawer(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const showClickHandler = () => {
    props.setRenderBg(appliedColor[0]);
    /* 进行下一步，改变App的渲染状态 */
    props.setStatus(1);
  }

  return (
    <div className={classes.root} >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepHint(index)}</Typography>
              {/* 每一步显示不同的内容 */}
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext(index)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Backdrop className={classes.backdrop} open={ifStartAnalysis} >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>所有步骤已完成</Typography>
          <Button onClick={handleReset} className={classes.button}>
            重新选择
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={showClickHandler}
          >
            查看效果
          </Button>
        </Paper>
      )}
    </div>
  );
}



