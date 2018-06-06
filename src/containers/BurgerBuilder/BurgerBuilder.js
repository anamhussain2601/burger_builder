import React, { Component } from 'react';
import AuxNew from '../../hoc/AuxNew';
import Burger from '../../components/Burger/Burger';
// import buildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES ={
    salad : 2,
    cheese :8,
    meat: 8,
    bacon : 3
}

//INGREDIENT_PRICES['salad']=2


class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state= {...}
    // }

    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 50,
        purchasable:false

    }

    updatePurchaseState(ingredients){
        

        const sum = Object.keys(ingredients)
        .map(igKey => {
             return ingredients[igKey]
        })
        .reduce((sum,el) => {
            return sum + el; 
        }, 0);
        this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type)  =>{
        const OldCount = this.state.ingredients[type];
        const updatedCount = OldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({totalPrice : newPrice , ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    } 

    removeIngredientHandler =(type) =>{
        const OldCount = this.state.ingredients[type];

        if(OldCount <=0){
            console.log("less");
            return;
            
        }


        const updatedCount = OldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        this.setState({totalPrice : newPrice , ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
        {   
            disabledInfo[key] = disabledInfo[key] <=0  //will return true if disabled  or false
        }

        return(

            <AuxNew>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler} 
                    disabled    ={disabledInfo}
                    purchasable = {this.state.purchasable}
                    price={this.state.totalPrice}/>
            </AuxNew>
        );

    }

}

export default BurgerBuilder;