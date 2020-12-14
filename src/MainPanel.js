import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ConfigPanel from './ConfigPanel';

const useStyles = makeStyles((theme) => ({
    configPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
    },
}));


export default function MainPanel(props) {

    const classes = useStyles();

    const [customFunction, setFunction] = useState("您还未输入");

    const [design, setDesign] = useState({
        "layout": [],
        "navigate": []
    });

    return (
        <div className={classes.configPanel}>
            <ConfigPanel
                getSteps={props.getSteps}
                activeStep={props.activeStep}
                setActiveStep={props.setActiveStep}
                setDesign={setDesign}
                setFunction={setFunction}
                setStatus={props.setStatus}
                customFunction={customFunction}
                design={design}
            >
            </ConfigPanel>
        </div>
    );
}