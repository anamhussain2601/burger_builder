import React from 'react';
import AuxNew from '../../hoc/AuxNew'
import classes from './layout.css';

const layout = (props) =>(
    <AuxNew>
    <div>Toolbar ,SideDrawer, Backdrop   </div>
    <main className = {classes.Content }>
        {props.children}
    </main>
    </AuxNew>
);

export default layout; 