import React from 'react';
import GridLayout from 'react-grid-layout';
import { makeStyles } from '@material-ui/core/styles';

const layoutCenter = [
    { i: 'naviBar', x: 3, y: 0, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
    { i: 'main', x: 6, y: 5, w: 6, h: 10, resizeHandles: ['se', 'sw'] },
    { i: 'footer', x: 3, y: 20, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
    { i: 'leftSider', x: 3, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw'] },
    { i: 'rightSider', x: 12, y: 5, w: 3, h: 10, resizeHandles: ['se', 'sw'] },
];


export default function CustomDesign(props) {


    return (
        <div>
            <GridLayout className="layout" layout={layoutCenter} cols={15} rowHeight={30} width={1500} style={{marginTop: 50}}>
                <div key="naviBar" style={{ backgroundColor: "#66CCFF" }}>NaviBar</div>
                <div key="main" style={{ backgroundColor: "Orange" }}>Main</div>
                <div key="footer" style={{ backgroundColor: "#66CCFF" }}>Footer</div>
                <div key="leftSider" style={{ backgroundColor: "#FF6666" }}>Left Sider</div>
                <div key="rightSider" style={{ backgroundColor: "#FF6666" }}>Right Sider</div>
            </GridLayout>
        </div>
    );
}