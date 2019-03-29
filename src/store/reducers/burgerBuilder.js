import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 2.5,
    bacon: 1
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(action, state);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state);
        default:
            return state;
    }
};

const recalculateTotalPrice = (ingredients) => {
    const base = 4;
    let ingredientsCost = 0;
    for (let ingredient in ingredients) {
        ingredientsCost += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
    }
    return base + ingredientsCost;
};

const addIngredient = (state, action) => ({
    ...state,
    ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
});

const removeIngredient = (state, action) => ({
    ...state,
    ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

});

const setIngredients = (action, state) => {
    const totalPrice = recalculateTotalPrice(action.ingredients);
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: totalPrice,
        error: false
    };
};

const fetchIngredientsFailed = state => ({
    ...state,
    error: true
});

export default burgerBuilder;