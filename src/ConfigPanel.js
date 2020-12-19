import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import nlpSearchFunc from './WebReq';
import { nlpSearchColor } from './WebReq';
import Paper from '@material-ui/core/Paper';
import ConfigPreview from './ConfigPreview';
import arrow from './logo/arrow.png';
import sipag from './logo/sipag.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import BorderColorIcon from '@material-ui/icons/BorderColor';


const useStyles = makeStyles((theme) => ({
    buttonPos: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: theme.spacing(3)
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(5),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(1),
    },
    inputPos: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "column"
    },
    emptyBlock: {
        width: "100%",
        height: "100px"
    },
    logo: {
        width: "580px",
        height: "210px"
    },
    arrow: {
        width: "45px",
        height: "100px"
    },
    font: {
        fontSize: "36px",
        fontFamily: "Microsoft Yahei",
        fontWeight: "bold"
    },
    smallBlock: {
        width: "100%",
        height: "50px"
    },
    colorBlock: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        overflow: "auto"
    },
    rgbFont: {
        fontSize: "24px",
        fontFamily: "Microsoft Yahei",
    }

}));


const funcStep = 0;   /* 分析功能的步骤数 */
const colorStep = 1;  /* 分析颜色的步骤数 */

export default function ConfigPanel(props) {

    const classes = useStyles();

    const steps = props.getSteps();
    const [ifStartAnalysis, setIfStartAnalysis] = useState(false);  /* 是否开始分析 */
    const [funcInput, setFuncInput] = useState("");                 /* 更改用户功能需求输入 */
    const [colorStyleInput, setColorStyleInput] = useState("");     /* 获取用户对颜色需求的输入 */

    /* 提取用户可能期待的颜色，这个不是最终的颜色 */
    /* wishColor ColorInfo 对象 */
    const [wishColor, setWishColor] = useState([]);

    /* 确定谁打开，需要传入rgb */
    const [whoOpen, setWhoOpen] = useState("");

    /* 获取用户对功能需求的输入 */
    const funcDemandChange = (event) => {
        setFuncInput(event.target.value);
        props.setFunction(event.target.value);
    }

    /* 获取用户对颜色的输入 */
    const colorDemandChange = (event) => {
        setColorStyleInput(event.target.value);
    }

    /* 分析结束后要做的事情 */
    const afterAnalysis = () => {
        setIfStartAnalysis(false);
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleReset = () => {
        props.setActiveStep(0);
    };

    const handleRender = () => {
        props.setStatus(1);
    }

    function SimpleDialog(props) {

        let open = whoOpen === props.color;

        return (
            <Dialog 
                onClose={() => setWhoOpen("")} 
                aria-labelledby="simple-dialog-title" 
                open={open} 
                style={{backgroundColor: "transparent",
                boxShadow: 'none'
                }}
                >
                <DialogTitle id="simple-dialog-title">颜色设置</DialogTitle>
                <List>
                    <ListItem autoFocus button onClick={() => props.setPrimary(props.color)}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: "white"}}>
                                <BorderColorIcon color="primary"/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="设置为主色调" />
                    </ListItem>
                    <ListItem autoFocus button onClick={() => props.setSecondary(props.color)}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: "white"}}>
                                <BorderColorIcon color="secondary"/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="设置为配色调" />
                    </ListItem>
                </List>
            </Dialog>
        );
    }


    /*
      @function getStepContent
      返回Step组件不同步渲染的内容
    */
    function getStepContent(step) {
        switch (step) {
            case 0:
                // 功能输入
                return (
                    <div className={classes.inputPos}>
                        <img
                            src={sipag}
                            className={classes.logo}
                            alt="SIPAG"
                        >
                        </img>
                        <form className={classes.form} noValidate>
                            <TextField
                                value={funcInput}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="funcInput"
                                label='试试输入 "我想要一个记录生活的个人博客"'
                                name="funcInput"
                                autoComplete="funcInput"
                                autoFocus
                                onChange={funcDemandChange}
                            />
                        </form>
                        <span>
                            <img
                                src={arrow}
                                alt="null"
                                className={classes.arrow}
                            >
                            </img>
                            <span className={classes.font}>
                                请输入您软件的应用场景
                            </span>
                        </span>
                        <div className={classes.emptyBlock}></div>
                    </div>
                );

            case 1:
                // 输入颜色风格
                return (
                    <div className={classes.inputPos}>
                        <img
                            src={sipag}
                            className={classes.logo}
                            alt="SIPAG"
                        >
                        </img>
                        <form className={classes.form} noValidate>
                            <TextField
                                value={colorStyleInput}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="colorInput"
                                label='试试输入 "我喜欢活泼生动的画风"'
                                name="colorInput"
                                autoComplete="colorInput"
                                autoFocus
                                onChange={colorDemandChange}
                            />
                        </form>
                        <span className={classes.font}>
                            请输入您想要的风格配色
                        </span>
                        <div className={classes.emptyBlock}></div>
                    </div>
                );

            case 2:
                // 猜你喜欢的颜色搭配
                const colorBar = wishColor.map((colorInfo) => {
                    return (
                        <div key={colorInfo.color}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{
                                backgroundColor: colorInfo.color,
                                height: '100px',
                                width: '100px',
                                padding: '20px',
                                position: "relative",
                                marginRight: "5px",
                                borderStyle: "solid",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            >
                                <Button
                                    style={{
                                        height: '100%',
                                        width: '100px',
                                    }}
                                    onClick={
                                        () => {
                                            setWhoOpen(colorInfo.color);
                                        }
                                    }>
                                </Button>
                            </div>
                            <SimpleDialog 
                                color={colorInfo.color} 
                                setPrimary={props.setPrimary}
                                setSecondary={props.setSecondary}
                                word={colorInfo.word}
                                setWhoOpen={setWhoOpen}
                            />
                            <h2 style={{color: colorInfo.color}}>{colorInfo.color}</h2>
                            <h3 style={{color: colorInfo.color}}>{colorInfo.word}</h3>
                        </div>
                    );
                });
                return (
                    <div className={classes.inputPos}>
                        <p className={classes.font}>
                            根据您的输入，我们为您推荐了以下色彩
                        </p>
                        <p style={{
                            fontSize: "24px",
                            fontFamily: "Microsoft Yahei",
                        }}>
                            鼠标点击色块以设置配色
                        </p>
                        <div className={classes.colorBlock}>
                            {colorBar}
                        </div>
                        <div className={classes.emptyBlock}></div>
                    </div>
                );

            case 3:
                // 其他需求声明
                return (
                    <div className={classes.inputPos}>
                        <img
                            src={sipag}
                            className={classes.logo}
                            alt="SIPAG"
                        >
                        </img>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="otherDemand"
                                label='例如 "一定要突出中心元素！"'
                                name="otherDemand"
                                autoComplete="otherDemand"
                                autoFocus
                                onChange={() => { }}
                            />
                        </form>
                        <span className={classes.font}>
                            您还有什么额外需求吗？
                        </span>
                        <div className={classes.emptyBlock}></div>
                    </div>
                );

            case 4:
                // 最终呈现
                return (
                    <div>
                        <ConfigPreview
                            customFunction={props.customFunction}
                            design={props.design}
                        >
                        </ConfigPreview>
                        <div className={classes.emptyBlock}></div>
                    </div>
                );

            default:
                return (
                    <div className={classes.emptyBlock}>

                    </div>
                );
        }
    }

    /* 如果index是颜色分析，则渲染颜色 */
    const handleNext = (index) => {
        if (index === funcStep) {
            setIfStartAnalysis(true);
            nlpSearchFunc(funcInput, props.setDesign, afterAnalysis);
        }
        else if (index === colorStep) {
            setIfStartAnalysis(true);
            nlpSearchColor(colorStyleInput, setWishColor, afterAnalysis);
        }
        else {
            props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>

            <Backdrop className={classes.backdrop} open={ifStartAnalysis} >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div>
                {getStepContent(props.activeStep)}
            </div>

            {props.activeStep <= steps.length - 1 && (
                <div className={classes.buttonPos}>
                    <Button
                        disabled={props.activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                        size="large"
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNext(props.activeStep)}
                        className={classes.button}
                        size="large"
                        endIcon={<ArrowForwardIosIcon />}
                    >
                        {props.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            )}

            {props.activeStep === steps.length && (
                <Paper square elevation={0} className={classes.buttonPos}>
                    <Button
                        onClick={handleReset}
                        className={classes.button}
                        size="large"
                        startIcon={<ReplayIcon />}
                    >
                        重新选择
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleRender}
                        size="large"
                        endIcon={<PlayArrowIcon />}
                    >
                        查看效果
                    </Button>
                </Paper>
            )
            }

        </div>
    );
}