import React from 'react';
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
import { Divider, Drawer, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function Preview(props) {

    const theme = useTheme();

    const drawerWidth = "25%";

    const useStyles = makeStyles((theme) => ({
      DrawerPaper: {
        width: drawerWidth
      }
    }));
  
    const classes = useStyles();

    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={props.open}
            classes={{
                paper: classes.DrawerPaper,
            }}
        >
            <div>
                <IconButton onClick={() => {
                    props.setDrawer(false);
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

                    <Divider />

                    <ListItem key={'github'}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <a href="https://github.com/scyq/Software-Interface-Prototype-Automatic-Generator"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View On GitHub
                </a>
                    </ListItem>

                </List>
            </div>
        </Drawer>
    );
}