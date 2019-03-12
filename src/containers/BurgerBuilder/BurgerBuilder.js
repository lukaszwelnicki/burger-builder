import React, {Component} from 'react';
import {connect} from 'react-redux'

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../../store/actions";


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('https://lwsoftware-burger.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         let ingredients = {...response.data};
        //         this.setState({
        //             ingredients: response.data,
        //             totalPrice: this.recalculateTotalPrice(ingredients)
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }
    //
    // recalculateTotalPrice(ingredients) {
    //     const base = 4;
    //     let ingredientsCost = 0;
    //     for (let ingredient in ingredients) {
    //         ingredientsCost += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
    //     }
    //     return base + ingredientsCost;
    // }

    updatePurchaseState(ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => (sum + el), 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                               ingredientRemoved={this.props.onIngredientRemoved}
                               disabled={disabledInfo}
                               purchasable={this.updatePurchaseState(this.props.ings)}
                               price={this.props.price}
                               ordered={this.purchaseHandler}/>
            </Aux>);
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         purchaseCancelled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler}
                                         price={this.props.price}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));