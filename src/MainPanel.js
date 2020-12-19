import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ConfigPanel from './ConfigPanel';

const useStyles = makeStyles((theme) => ({
    configPanel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        overflow: "auto"
    },
}));


export default function MainPanel(props) {

    const classes = useStyles();

    return (
        <div className={classes.configPanel}>
            <ConfigPanel
                getSteps={props.getSteps}
                activeStep={props.activeStep}
                setActiveStep={props.setActiveStep}
                setDesign={props.setDesign}
                setFunction={props.setFunction}
                setStatus={props.setStatus}
                customFunction={props.customFunction}
                design={props.design}
                primaryColor={props.primaryColor}
                secondaryColor={props.secondaryColor}
                setPrimary={props.setPrimary}
                setSecondary={props.setSecondary}
            >
            </ConfigPanel>
        </div>
    );
}