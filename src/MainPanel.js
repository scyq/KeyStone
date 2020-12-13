import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SplitPanel from 'react-split-pane';
import ConfigPreview from './ConfigPreview';
import ConfigPanel from './ConfigPanel';

const useStyles = makeStyles((theme) => ({
    configPanel: {
        marginLeft: 4,
        marginRight: 4,
        marginTop: 4,
        marginBottom: 4
    },
    previewPanel: {
        marginLeft: 4,
        marginRight: 4,
        marginTop: 4,
        marginBottom: 4,
        overflow: "scroll",
    }
}));


export default function MainPanel() {

    const classes = useStyles();

    const [customFunction, setFunction] = useState("您还未输入");

    const [design, setDesign] = useState({
        "layout": [],
        "navigate": []
    });

    const [drawerOpen, setDrawer] = useState(false);

    return (
        <div>
            <SplitPanel
                split="vertical"
                minSize={300}
                defaultSize="70%"
                resizerStyle={{
                    width: "5px",
                    margin: "-5px 0",
                    backgroundColor: "rgb(54, 100, 139)",
                    borderLeft: "5px solid rgb(54, 100, 139)",
                    borderRight: "5px solid rgb(54, 100, 139)",
                    cursor: "col-resize"
                }}
            >

                <div className={classes.configPanel}> 
                    <ConfigPanel>
                        
                    </ConfigPanel>
                </div>
                <div className={classes.previewPanel}>
                    <ConfigPreview
                        open={drawerOpen}
                        func={customFunction}
                        design={design}
                        setDrawer={setDrawer}
                        customFunction={customFunction}
                    >
                    </ConfigPreview>
                </div>

            </SplitPanel>
        </div>
    );
}