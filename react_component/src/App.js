import React from 'react';
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(35),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '300%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {
  const classes = useStyles();
  
  const [inputContent, setInputContent] = useState("");
  const [resContent, setResContent] = useState("");
  
  const textFieldChange = (event) => {
    setInputContent(event.target.value);
  }


  /* 向本地端口发送get请求 */
  const nlpSearch = () => {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    let url = "http://127.0.0.1:9999/"
    fetch(url + '?query=' + inputContent)
    .then(res => res.json())
    .then(data => {
      console.log(data["data"]);
      setResContent(data);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          What you want ?
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nlpInput"
            label="输入你想要的Web设想"
            name="nlpInput"
            autoComplete="nlpInput"
            autoFocus
            onChange={textFieldChange}        
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={nlpSearch}
          >
            确定
          </Button>

          <Typography component="h1" variant="h5">
            {resContent["data"]}
          </Typography>
        </form>
      </div>
    </Container>
  );
}