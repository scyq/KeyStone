import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NaviBar from './NaviBar';
// import SearchBar from './SearchBar';

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
  }

}));

export default function App() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.NaviBar}>
        <NaviBar>

        </NaviBar>
      </div>

    </Container>
  );
}