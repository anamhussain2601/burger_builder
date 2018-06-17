import React, {Component} from  'react';
import AuxNew from '../../../hoc/AuxNew';    
import Button from '../../UI/Button/Button'; 

class  OrderSummary extends  Component{

    componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate ijioj');
    }


     render( ){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey, index) => {
            return <li key={index}>
                <span style={{textTransfo7rm:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                 </li>
        });


         return(
            <AuxNew>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients :</p>
                <ul>
                    {ingredientSummary}

                </ul>
                <p><strong>Total Price:{this.props.price}</strong></p>
                <p>Continue to CheckOut?</p>
                <Button btnType= "Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            
                <Button btnType= "Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </AuxNew>
         );
     }

}
export default OrderSummary;