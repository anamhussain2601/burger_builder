import React from 'react';
import classes from './DrawerToggle.css'

const drawerToggle =(props) => (
    <div className ={classes.DrawToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>

    </div>
)

export default drawerToggle;  