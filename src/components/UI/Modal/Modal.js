import React from 'react';
import classes from './Modal.css';
import AuxNew from  '../../../hoc/AuxNew';
import Backdrop from '../Backdrop/Backdrop';
      
const Modal = (props) => (
    <AuxNew>
        <Backdrop show ={props.show} clicked ={props.modalClosed}/>
    <div 
        className = {classes.Modal}
        style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity :props.show ? '1':'0'
          }}>
         {props.children}
    </div>
    </AuxNew>
);

export default Modal;