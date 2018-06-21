import * as actionTypes from '../config/actionConstants/recipe';

const initialState = {
    recipes: [],
};

//
// Reducer...
//
export default function recipe(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_RECIPES_DATA:
            return {...state, recipes: action.payload};
        default:
            return state;
    }
}