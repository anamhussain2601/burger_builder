import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
        className = {[classes.Button , classes[props.btnType]].join(' ')} // join(' ') this joins the array with the white space
        
        onClick= {props.clicked}> {props.children}
    </button> 

);

export default button;