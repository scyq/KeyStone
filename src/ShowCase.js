
import React from 'react';
import Album from './template/album/Album';
import Blog from './template/blog/Blog';
import Checkout from './template/checkout/Checkout';
import Dashboard from './template/dashboard/Dashboard';
import Pricing from './template/pricing/Pricing';
import SignIn from './template/sign-in/SignIn';
//åimport SignInSide from './template/sign-in-side/SignInSide';
import SignUp from './template/sign-up/SignUp';
import StickyFooter from './template/sticky-footer/StickyFooter';
import CustomDesign from './CustomDesign';
import ToolBar from './ToolBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export default function ShowCase(props) {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: props.primaryColor,
            },
            secondary: {
                light: props.secondaryColor,
                main: props.secondaryColor,
                contrastText: props.secondaryColor,
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
        },
    });

    let temp = null;

    switch (props.template[0]) {
        case "album":
            temp = <Album></Album>;
            break;
        case "blog":
            temp = <Blog></Blog>;
            break;
        case "checkout":
            temp = <Checkout></Checkout>;
            break;
        case "dashboard":
            temp = <Dashboard></Dashboard>;
            break;
        case "sign-in":
            temp = <SignIn></SignIn>;
            break;
        case "sign-up":
            temp = <SignUp></SignUp>;
            break;
        case "pricing":
            temp = <Pricing></Pricing>;
            break;
        case "sticky-footer":
            temp = <StickyFooter></StickyFooter>;
            break;
        default:
            temp = <CustomDesign primaryColor={props.primaryColor} secondaryColor={props.secondaryColor}></CustomDesign>;
            break;
    }

    return (
        <ThemeProvider theme={theme}>
            <ToolBar setStatus={props.setStatus}></ToolBar>
            {temp}
        </ThemeProvider>
    );
}