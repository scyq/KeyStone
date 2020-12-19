import React from 'react';
import GridLayout from 'react-grid-layout';
import TopBar from './component/TopBar';
import LeftNaviBar from './component/LeftNaviBar';
import BottomNaviBar from './component/BottomNavibar';


const layoutCenter = [
    // x != 0 因为要往左偏移使其居中
    { i: 'naviBar', x: 3, y: 0, w: 12, h: 2, resizeHandles: ['se', 'sw'] },
    { i: 'main', x: 6, y: 3, w: 6, h: 14, resizeHandles: ['se', 'sw'] },
    { i: 'footer', x: 3, y: 18, w: 12, h: 5, resizeHandles: ['se', 'sw'] },
    { i: 'leftSider', x: 3, y: 3, w: 3, h: 14, resizeHandles: ['se', 'sw'] },
    { i: 'rightSider', x: 12, y: 3, w: 3, h: 14, resizeHandles: ['se', 'sw'] },
];


export default function CustomDesign(props) {

    return (
        <div>
            <GridLayout className="layout" layout={layoutCenter} cols={15} rowHeight={30} width={1500} style={{marginTop: 50}}>
                <div key="naviBar">
                    <TopBar></TopBar>
                </div>
                <div key="main" style={{backgroundColor: props.primaryColor}}>

                </div>
                <div key="footer" >
                    <BottomNaviBar></BottomNaviBar>
                </div>
                <div key="leftSider" >
                    <LeftNaviBar></LeftNaviBar>
                </div>
                <div key="rightSider" style={{backgroundColor: props.primaryColor}}>

                </div>
            </GridLayout>
        </div>
    );
}