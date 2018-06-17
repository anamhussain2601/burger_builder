import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{

 
let transformedIngredients = Object.keys(props.ingredients)// gives an array of the keys . js method
                        .map(igKey =>{
                            return[...Array(props.ingredients[igKey])].map((_, i)=>{  //Array() provided by js
                              return  <BurgerIngredient key={igKey+i} type = {igKey}/> ;
                            }); 
                          })
                          
                          .reduce((arr,el) =>{
                              return arr.concat(el)
                          } , []);                    
console.log(transformedIngredients)

if(transformedIngredients.length ===0)
{
    transformedIngredients = <p>Please start adding ingredients!</p>
    
}
//whats goin on in above code is simple creating an array from objects
//and making the arrays of the items cheese or bacon .
//look closer!!!

        
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type ="bread-top"/>
            {/* <BurgerIngredient type ="cheese"/>
            <BurgerIngredient type ="meat"/> */}

            {transformedIngredients}
            <BurgerIngredient type ="bread-bottom"/>
             
            
            
            
            
        </div>
    );

};

export default burger;