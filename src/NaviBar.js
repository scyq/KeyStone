import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import StepConnector from '@material-ui/core/StepConnector';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import clsx from 'clsx';


/* Icon的样式 */
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});


const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

/* Stepper 每一步的Icon 在这里修改 */
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
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

  const [templateChoice, setTemplateChoice] = useState(0);  

  const [appliedColor, setApplyColor] = useState(["White"]);             /* 最终应用的颜色，依赖于用户的选择 */

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      background: "white"
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

  const steps = props.getSteps();
  const classes = useStyles();

  /* 处理用户模版的选择 */
  const handleTemplateChange = event => {
    let template = parseInt(event.target.value)
    setTemplateChoice(template);
    props.setTemplate(template);
  }




  const handleReset = () => {
    props.setActiveStep(0);
  };

  const showClickHandler = () => {
    props.setRenderBg(appliedColor[0]);
    /* 进行下一步，改变App的渲染状态 */
    props.setStatus(1);
  }

  return (
    <div className={classes.root} >
      <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorlibConnector></ColorlibConnector>}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>

            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* 
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepHint(index)}</Typography>
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
      )} */}
    </div>
  );
}



