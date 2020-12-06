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
import { AppBar, Toolbar } from '@material-ui/core';

import GridLayout from 'react-grid-layout'




export default function App() {
  const [status, setStatus] = useState(0);
  const [renderBg, setRenderBg] = useState("White");

  /*
    template 是指用户选择模版的序号
    0 - Default
  */
  const [template, setTemplate] = useState(0);

  const useStyles = makeStyles((theme) => ({
    NaviBar: {
      position: 'fixed',
      width: '200vh',
      left: 0,
      top: 80,
      right: 0,
      height: '100vh',
      background: 'white',
      display: 'flex',
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
    }
  }));

  const classes = useStyles();

  if (status === 0) {
    return (
      <Container component="main" maxWidth="xs">
        <AppBar style={{ background: "#36648B" }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              软件界面原型自动生成机
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.NaviBar}>
          <NaviBar setStatus={setStatus} setRenderBg={setRenderBg} setTemplate={setTemplate}>
          </NaviBar>
        </div>

      </Container>
    );
  }
  else if (status === 1) {
    switch (template) {
      case 0:
        const layout = [
          { i: 'naviBar', x: 0, y: 0, w: 12, h: 5, resizeHandles: ['se', 'sw']},
          { i: 'main', x: 3, y: 5, w: 6, h: 10, resizeHandles: ['se', 'sw']},
          { i: 'footer', x: 0, y: 20, w: 12, h: 5, resizeHandles: ['se', 'sw']},
          { i: 'leftSider', x : 0, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw']},
          { i: 'rightSider', x : 9, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw']},
        ];
        return (
          <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
            <div key="naviBar" style={{backgroundColor: "#66CCFF"}}>NaviBar</div>
            <div key="main" style={{backgroundColor: "Orange"}}>Main</div>
            <div key="footer" style={{backgroundColor: "#66CCFF"}}>Footer</div>
            <div key="leftSider" style={{backgroundColor: "#FF6666"}}>Left Sider</div>
            <div key="rightSider" style={{backgroundColor: "#FF6666"}}>Right Sider</div>
          </GridLayout>
        );

      case 1:
        return (
          <div className={classes.templateRender}>
            <Album>

            </Album>
          </div>
        );

      case 2:
        return (
          <div className={classes.templateRender}>
            <Blog>

            </Blog>
          </div>
        );

      case 3:
        return (
          <div className={classes.templateRender}>
            <Checkout>

            </Checkout>
          </div>
        );

      case 4:
        return (
          <div className={classes.templateRender}>
            <Dashboard>

            </Dashboard>
          </div>
        );

      case 5:
        return (
          <div className={classes.templateRender}>
            <Pricing>

            </Pricing>
          </div>
        );

      case 6:
        return (
          <div className={classes.templateRender}>
            <SignIn>

            </SignIn>
          </div>
        );

      case 7:
        return (
          <div className={classes.templateRender}>
            <SignInSide>

            </SignInSide>
          </div>
        );

      case 8:
        return (
          <div className={classes.templateRender}>
            <SignUp>

            </SignUp>
          </div>
        );

      case 9:
        return (
          <div className={classes.templateRender}>
            <StickyFooter>

            </StickyFooter>
          </div>
        );

      default:
        return (
          <div className={classes.Render}>

          </div>
        );

    }
  }

}