import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RadioGroup } from '@material-ui/core';
import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';


function getSteps() {
  return ['您是否有想要的模板？', '您想要什么样的风格配色？', '您还有其他什么需求？'];
}

/*
  @function getStepHint
  根据引导的位置来获取引导的提示词
*/
function getStepHint(step) {
  switch (step) {
    case 0:
      return '我想要一个纵向布局的登陆界面。';
    case 1:
      return '我喜欢低调的商务风。';
    case 2:
      return '您还有其他什么需求？';
    default:
      return '随便说点什么吧。'
  }
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    left: 0,
    background: 'White',
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
}));

export default function NaviBar() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [templateChoice, setTemplateChoice] = useState("default");
  const [colorStyle, setColorStyle] = useState("White");
  const steps = getSteps();

  function getStepContent(step) {
    switch (step) {
      case 0:
        // 布局选项
        return (
          <div>
            <RadioGroup row aria-label="可参考的布局" value={templateChoice} onChange={handleTemplateChange}>
              <FormControlLabel value="default" control={<Radio />} label="Default" />
              <FormControlLabel value="album" control={<Radio />} label="Album" />
              <FormControlLabel value="blog" control={<Radio />} label="Blog" />
              <FormControlLabel value="checkout" control={<Radio />} label="Checkout" />
              <FormControlLabel value="dashboard" control={<Radio />} label="Dashboard" />
              <FormControlLabel value="pricing" control={<Radio />} label="Pricing" />
              <FormControlLabel value="sign-in" control={<Radio />} label="Sign-in" />
              <FormControlLabel value="sign-in-side" control={<Radio />} label="Sign-in-side" />
              <FormControlLabel value="sign-up" control={<Radio />} label="Sign-up" />
              <FormControlLabel value="sticky-footer" control={<Radio />} label="Sticky-footer" />
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

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={colorClickHandler}
              >
                尝试一下
              </Button>

            </form>
          </div>
        );

      default:
        return (<div></div>);
    }
  }

  const colorDemandChange = () => {

  }

  const colorClickHandler = () => {

  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleTemplateChange = event => {
    setTemplateChoice(event.target.value);
  }

  return (
    <div className={classes.root}>
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
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
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
          >
            查看效果
          </Button>
        </Paper>
      )}
    </div>
  );
}



