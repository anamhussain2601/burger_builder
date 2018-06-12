import React from  'react';
import AuxNew from '../../../hoc/AuxNew';    
import Button from '../../UI/Button/Button'; 

const OrderSummary =(props) =>{

    console.log("props :",props);

    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey, index) => {
            return <li key={index}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                 </li>
        });
    
    return(
        <AuxNew>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummary}

            </ul>
            <p><strong>Total Price:{props.price}</strong></p>
            <p>Continue to CheckOut?</p>
            <Button btnType= "Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        
            <Button btnType= "Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        
        </AuxNew>
    )
};

export default OrderSummary;