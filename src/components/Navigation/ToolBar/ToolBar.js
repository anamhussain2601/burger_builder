import React from 'react';
import classes from './ToolBar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = () => (

    <header className = {classes.ToolBar}>
        <div>MENU</div>
        <div className ={classes.Logo}>
            <Logo />
        </div>
        <NavigationItems/>
        
        
                
    </header>
);

export default toolbar;