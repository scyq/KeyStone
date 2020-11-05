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
        <AppBar style={{background: "#36648B"}}>
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
        return (
          <div className={classes.Render}>

          </div>
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