import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';


export default function ToolBar (props) {
    return (
        <AppBar position="sticky" color="transparent">
        <Toolbar>
          <Button
            variant="contained"
            color="default"
            size="large"
            style={{marginRight: 2}}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="default"
            size="large"
            style={{marginRight: 2}}
            startIcon={<CloseIcon />}
            onClick={
              () => {
                props.setStatus(0);
              }
            }
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>
    );
}