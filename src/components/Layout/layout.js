import React from 'react';
import AuxNew from '../../hoc/AuxNew'
import classes from './layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) =>(
    <AuxNew>
    {/* <div>Toolbar ,SideDrawer, Backdrop   </div> */}
    <ToolBar/>
    <SideDrawer/>
    <main className = {classes.Content }>
        {props.children}
    </main>
    </AuxNew>
);

export default layout; 