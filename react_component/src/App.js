import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NaviBar from './NaviBar';
import Album from './template/album/Album';



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
      top: 0,
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
    }

  }));

  const classes = useStyles();

  if (status === 0) {
    return (
      <Container component="main" maxWidth="xs">
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
        return (<Album></Album>);

      default:
        return (
          <div className={classes.Render}>

          </div>
        );

    }
  }

}