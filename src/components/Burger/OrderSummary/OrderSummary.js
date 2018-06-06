import React from  'react';
import AuxNew from '../../../hoc/AuxNew';     

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
            <p>continue to CheckOut?</p>

        </AuxNew>
    )
};

export default OrderSummary;