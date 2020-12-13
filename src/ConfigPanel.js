import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttonPos: {
        position: "absolute",
        right: 3,
        bottom: 10
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));



export default function ConfigPanel(props) {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.buttonPos}>
                <Button
                    // disabled={activeStep === 0}
                    // onClick={handleBack}
                    className={classes.button}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => handleNext(index)}
                    className={classes.button}
                >
                    Next
                {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                </Button>
            </div>

        </div>
    );
}