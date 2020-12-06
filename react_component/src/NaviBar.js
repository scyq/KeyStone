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


function getSteps() {
  return ['您的应用场景是什么？', '您想要什么样的风格配色？', '根据您的输入，我们推断您喜欢以下几种配色：', '您还有其他什么需求？'];
}

/*
  @function getStepHint
  根据引导的位置来获取引导的提示词
*/
function getStepHint(step) {
  switch (step) {
    case 0:
      return '暂不支持自定义功能实现。';
    case 1:
      return '我喜欢低调的商务风。';
    case 2:
      return '选择您想要的组合。';
    case 3:
      return '您还有其他什么需求？';
    default:
      return '随便说点什么吧。'
  }
}

export default function NaviBar(props) {

  const [wordsHandler] = useState(new WordsHandler());
  const [activeStep, setActiveStep] = useState(0);
  const [templateChoice, setTemplateChoice] = useState(0);
  const [colorStyleInput, setColorStyleInput] = useState([]);     /* NLP处理之后的结果，还未提取 */
  const [colorStyle, setColorStyle] = useState("White");          /* NLP获取颜色信息后，才会修改这里 */
  const [ifStartAnalysis, setIfStartAnalysis] = useState(false);  /* 是否开始分析 */
  const [wishColor, setWishColor] = useState([]);                 /* 提取用户可能期待的颜色，这个不是最终的颜色 */
  const [appliedColor, setApplyColor] = useState([]);             /* 最终应用的颜色 */
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      left: 0,
      background: colorStyle
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
              <FormControlLabel value={0} control={<Radio />} label="设计模式" />
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
                id="nlpInput"
                label="输入您想要的风格配色"
                name="nlpInput"
                autoComplete="nlpInput"
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
              <div style={{ backgroundColor: rgb, height: '100px', width: '100px', padding: '20px', position: "relative", marginRight: "5px" }} >
              </div>
              <FormControlLabel
                value = {rgb}
                control = {
                <Switch
                  color = "primary"
                  label = {rgb}
                >
                </Switch>}
                label = {rgb}
                labelPlacement = "start"
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

      default:
        return (<div></div>);
    }
  }


  /* 向本地端口发送get请求 */
  /*
    @param analysisDoneCallBack 回调函数，用于更新背景颜色
  */
  const nlpSearch = (analysisDoneCallBack) => {
    if (colorStyleInput.length <= 0) {
      analysisDoneCallBack();
      setWishColor(["#ffffff"]);
      return;
    }
    let url = "http://127.0.0.1:9999/"
    fetch(url + '?query=' + colorStyleInput)
      .then(res => res.json())
      .then(data => {
        /* 这里data还没有分词 */
        setColorStyleInput(data["data"]);
        const colorThief = new ColorThief();
        const wordsCounts = data["data"].length;

        /* rgb转十六进制 */
        const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
          const hex = x.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        }).join('');

        let temp = [];
        if (data["data"].length < 1) {
          analysisDoneCallBack()
          setWishColor(["#ffffff"]);
        }
        else{
          for (let words of data["data"]) {
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

        /* 分词交给后端处理了 */
        /* 利用正则表达式将长空格变成一个空格并分成数组，去掉头部是因为头部是一个空格 */
        // data["data"] = data["data"].replace(/\s+/g, ' ').split(' ');
        // data["data"].shift();
        console.log(data["data"]);
        wordsHandler.splitSpeech(data["data"]);
        /* 传入回调函数，重新触发渲染 */
        wordsHandler.wordAnalysis(setColorStyle);  /* 分析语义 */
      });

  };

  const colorDemandChange = (event) => {
    setColorStyleInput(event.target.value);
  }


  /* 如果index是颜色分析，则渲染颜色 */
  const handleNext = (index) => {
    if (index === 1) {
      setIfStartAnalysis(true);
      nlpSearch(() => {
        setIfStartAnalysis(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      });
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

  const handleTemplateChange = event => {
    let template = parseInt(event.target.value)
    setTemplateChoice(template);
    props.setTemplate(template);
  }

  const showClickHandler = () => {
    props.setRenderBg(colorStyle);
    props.setStatus(1); /* 进行下一步 */
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



