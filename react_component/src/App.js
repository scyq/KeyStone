import React from 'react';
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WordsHandler from './WordsHandler';
import Content from './Content';
import {NaviBar} from './NaviBar';

const BarWidth = 200;

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
    width: '150%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  NaviBar: {
    position: 'fixed',
    width: BarWidth,
    left: 0,
    top: 0,
    height: '100vh',
    background: 'LightGrey',
    display: 'flex',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }

}));

export default function App() {
  const classes = useStyles();
  
  /* 没有用类写，这里其实是定义了两个状态和改变状态的函数 */  
  const [bgColor, setBgColor] = useState("#000000");                        /* 背景颜色，用于回调函数 */
  const [renderQueue, setRenderQueue] = useState("");                       /* 渲染队列，用于回调函数 */
  const [inputContent, setInputContent] = useState("");                     /* 输入内容 */
  const [resContent, setResContent] = useState("");                         /* StanFord服务器返回内容 */
  const [wordsHandler] = useState(new WordsHandler())                       /* 数据处理类的创建 */  
  
  /* 当输入窗口发生改变会调用该函数 */
  const textFieldChange = (event) => {
    setInputContent(event.target.value);
  }

  /* 向本地端口发送get请求 */
  const nlpSearch = () => {
    let url = "http://127.0.0.1:9999/"
    fetch(url + '?query=' + inputContent)
    .then(res => res.json())
    .then(data => {
      /* 利用正则表达式将长空格变成一个空格并分成数组，去掉头部是因为头部是一个空格 */
      data["data"] = data["data"].replace(/\s+/g, ' ').split(' ');   
      data["data"].shift();
      setResContent(data);
      wordsHandler.splitSpeech(data["data"]);
      /* 传入回调函数，重新触发渲染 */
      wordsHandler.wordAnalysis(setRenderQueue, setBgColor);  /* 分析语义 */
    });
  };

  const clickHandler = () => {
    nlpSearch();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.NaviBar}>
        <List>
          {NaviBar}
        </List>
      </div>
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
            onClick={clickHandler}
          >
            确定
          </Button>

          <Typography component="h1" variant="h5">
            {resContent["data"]}
          </Typography>

          <Content renderQueue={renderQueue} background={bgColor}>

          </Content>
          
        </form>
      </div>
    </Container>
  );
}