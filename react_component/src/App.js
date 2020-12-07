import React from 'react';
import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import { AppBar, Button, Divider, Drawer, IconButton, Link, Toolbar } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import GridLayout from 'react-grid-layout';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import GitHubIcon from '@material-ui/icons/GitHub';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import ColorizeIcon from '@material-ui/icons/Colorize';
import Box from '@material-ui/core/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Skeleton from '@material-ui/lab/Skeleton';



export default function App() {
  const [status, setStatus] = useState(0);
  const [renderBg, setRenderBg] = useState("White");
  const [drawerOpen, setDrawer] = useState(true);

  /*
    template 是指用户选择模版的序号
    0 - Default
  */
  const [template, setTemplate] = useState(0);

  const theme = useTheme();

  const drawerWidth = "25%";

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
    },

    BarTitle: {
      flexGrow: 1
    },

    DrawerPaper: {
      width: drawerWidth
    }
  }));

  const classes = useStyles();

  if (status === 0) {
    return (
      <Container component="main" maxWidth="xs">
        <AppBar style={{ background: "#36648B" }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.BarTitle}>
              软件界面原型自动生成机
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {
              setDrawer(true);
            }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.NaviBar}>
          <NaviBar setStatus={setStatus} setRenderBg={setRenderBg} setTemplate={setTemplate}>
          </NaviBar>
        </div>
        <Drawer
          variant="persistent"
          anchor="right"
          open={drawerOpen}
          classes={{
            paper: classes.DrawerPaper,
          }}
        >
          <div>
            <IconButton onClick={() => {
              setDrawer(false);
            }}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Divider />
            <List>

              <ListItem button key={'function'}>
                <ListItemIcon>
                  <FiberNewIcon />
                </ListItemIcon>
                <ListItemText primary={'需求功能'}>
                </ListItemText>
                <ListItemText primary={'个人博客'}>
                </ListItemText>
              </ListItem>

              <ListItem button key={'layout'}>
                <ListItemIcon>
                  <BorderAllIcon />
                </ListItemIcon>
                <ListItemText primary={'采取的布局'}>
                </ListItemText>
                <ListItemText primary={'中心舞台'}>
                </ListItemText>
              </ListItem>

              <ListItem button key={'navigation'}>
                <ListItemIcon>
                  <CallSplitIcon />
                </ListItemIcon>
                <ListItemText primary={'导航模式'}>
                </ListItemText>
                <ListItemText primary={'金字塔模式'}>
                </ListItemText>
              </ListItem>

              <ListItem button key={'color'}>
                <ListItemIcon>
                  <ColorizeIcon />
                </ListItemIcon>
                <ListItemText primary={'Primary Color'}>
                </ListItemText>
                <Box bgcolor="primary.main" p={2} m={1}>
                </Box>
              </ListItem>

              <ListItem button key={'color'}>
                <ListItemIcon>
                  <ColorizeIcon />
                </ListItemIcon>
                <ListItemText primary={'Secondary Color'}>
                </ListItemText>
                <Box bgcolor="secondary.main" p={2} m={1}>
                </Box>
              </ListItem>

              <ListItem button key={'preview'}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary={'预览效果'}>
                </ListItemText>
                <Skeleton animation="wave" width={40} height={40}>
                </Skeleton>
              </ListItem>


              <ListItem key={'github'}>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <Link href="https://github.com/scyq/Software-Interface-Prototype-Automatic-Generator">
                  View On GitHub
                </Link>
              </ListItem>

            </List>
          </div>
        </Drawer>
      </Container>
    );
  }
  else if (status === 1) {
    switch (template) {
      case 0:
        const layout = [
          { i: 'naviBar', x: 0, y: 0, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
          { i: 'main', x: 3, y: 5, w: 6, h: 10, resizeHandles: ['se', 'sw'] },
          { i: 'footer', x: 0, y: 20, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
          { i: 'leftSider', x: 0, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw'] },
          { i: 'rightSider', x: 9, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw'] },
        ];
        return (
          <div>
            <AppBar position="sticky">
              <Toolbar>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  startIcon={<CloseIcon />}
                  onClick={
                    () => {
                      setStatus(0);
                    }
                  }
                >
                  Back
                </Button>
              </Toolbar>
            </AppBar>
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
              <div key="naviBar" style={{ backgroundColor: "#66CCFF" }}>NaviBar</div>
              <div key="main" style={{ backgroundColor: "Orange" }}>Main</div>
              <div key="footer" style={{ backgroundColor: "#66CCFF" }}>Footer</div>
              <div key="leftSider" style={{ backgroundColor: "#FF6666" }}>Left Sider</div>
              <div key="rightSider" style={{ backgroundColor: "#FF6666" }}>Right Sider</div>
            </GridLayout>
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