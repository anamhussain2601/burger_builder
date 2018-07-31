import React, { Component } from "react";
import AuxNew from "../../hoc/AuxNew";
import Burger from "../../components/Burger/Burger";
//import buildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 8,
  meat: 8,
  bacon: 3
};

//INGREDIENT_PRICES['salad']=2

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state= {...}
  // }

  state = {
    ingredients: null,
    totalPrice: 50,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:null
    
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-bce54.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({error:true})
      })        ;
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = type => {
    const OldCount = this.state.ingredients[type];
    const updatedCount = OldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const OldCount = this.state.ingredients[type];

    if (OldCount <= 0) {
      console.log("less");
      return;
    }

    const updatedCount = OldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    // // alert('You Continue!');
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Damon Salvatore",
    //     address: {
    //       street: "Mystic Falls",
    //       zipCode: "12345",
    //       country: "US"
    //     },
    //     email: "damon@damon.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios.post("/order.json", order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //will return true if disabled  or false
    }

    let orderSummary = null;

    let burger =this.state.error?<p>Ingredients can't be loaded! </p>: <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <AuxNew>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </AuxNew>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <AuxNew>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </AuxNew>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
