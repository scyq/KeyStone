import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NaviBar from './NaviBar';
import Typography from '@material-ui/core/Typography';
import Album from './template/album/Album';
import Blog from './template/blog/Blog';
import Checkout from './template/checkout/Checkout';
import Dashboard from './template/dashboard/Dashboard';
import Pricing from './template/pricing/Pricing';
import SignIn from './template/sign-in/SignIn';
import SignInSide from './template/sign-in-side/SignInSide';
import SignUp from './template/sign-up/SignUp';
import StickyFooter from './template/sticky-footer/StickyFooter';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import GridLayout from 'react-grid-layout';
import ToolBar from './ToolBar';
import GitHubIcon from '@material-ui/icons/GitHub';
import MainPanel from './MainPanel';
import Index from './home/Home';


/* 每一步的内容 */
function getSteps() {
  return ['请输入您主要的应用场景', '您想要什么样的风格配色？', '根据您的输入，我们推断您喜欢以下几种配色：', '您还有其他什么需求？'];
}


export default function App() {
  const [status, setStatus] = useState(-1);
  const [renderBg, setRenderBg] = useState("White");

  /*
    template 是指用户选择模版的序号
    0 - Default
  */
  const [template, setTemplate] = useState(0);

  /* 到哪儿一步了 */
  const [activeStep, setActiveStep] = useState(0);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    },
    NaviBar: {
      marginTop: '80px',
      width: '100%',
      background: '#fff',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    Render: {
      height: '100vh',
      width: '200vh',
      background: renderBg
    },

    templateRender: {
      background: renderBg
    },

    BarTitle: {
      flexGrow: 1
    },

    MainPanel: {
      // position: "absolute",
      // top: 160,
      // left: 0,
      // right: 0,
      // width: "100%",
      // height: "84%",
      display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
      
      flexGrow: 1,
      width: '100%',
    },

    previewPanel: {
      overflow: "scroll"
    }
  }));

  const classes = useStyles();

  if (status === -1) {
    return (
      <Index>
        
      </Index>
    );
  }
  else if (status === 0) {
    return (
      <Container component="main" className={classes.root}>
        <AppBar style={{ background: "#36648B" }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.BarTitle}>
              软件界面原型自动生成机
            </Typography>
            <IconButton color="inherit" onClick={() => {
              const w = window.open('about:blank');
              w.location.href = 'https://github.com/scyq/Software-Interface-Prototype-Automatic-Generator';
            }}>
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={classes.NaviBar}>
          <NaviBar
            getSteps={getSteps}
            activeStep={activeStep}
          >
          </NaviBar>
        </div>

        <div className={classes.MainPanel}>
          <MainPanel
            getSteps={getSteps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setStatus={setStatus}
          >

          </MainPanel>
        </div>

      </Container>
    );
  }
  else if (status === 1) {
    const layout = [
      { i: 'naviBar', x: 0, y: 0, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
      { i: 'main', x: 3, y: 5, w: 6, h: 10, resizeHandles: ['se', 'sw'] },
      { i: 'footer', x: 0, y: 20, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
      { i: 'leftSider', x: 0, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw'] },
      { i: 'rightSider', x: 9, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw'] },
    ];
    return (
      <div>
        <ToolBar setStatus={setStatus}></ToolBar>
        <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
          <div key="naviBar" style={{ backgroundColor: "#66CCFF" }}>NaviBar</div>
          <div key="main" style={{ backgroundColor: "Orange" }}>Main</div>
          <div key="footer" style={{ backgroundColor: "#66CCFF" }}>Footer</div>
          <div key="leftSider" style={{ backgroundColor: "#FF6666" }}>Left Sider</div>
          <div key="rightSider" style={{ backgroundColor: "#FF6666" }}>Right Sider</div>
        </GridLayout>
      </div>
    );


  }

}