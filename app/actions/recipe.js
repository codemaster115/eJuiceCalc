import * as actions from '../config/actionConstants/recipe';
import * as firebase from 'firebase';

function handleResponse(type, payload) {
    return { type, payload };
}

export function addRecipe(newRecipe) {
    return dispatch => {
        dispatch(handleResponse(actions.ADD_RECIPE_REQUEST, newRecipe));

        const database = firebase.database();
        database.ref('/recipes').once('value').then(async prevRecipes => {
            let recipes = prevRecipes.val() || [];
            let key = database.ref('/recipes').push().key;

            if (newRecipe.imgUri) {
                const response = await fetch(newRecipe.imgUri);
                const blob = await response.blob();
                firebase.storage().ref().child('recipes/'+key).put(blob)
                .then(async res => {
                    const url = await res.ref.getDownloadURL()
                    recipes.push({
                        id: key,
                        recipe: {
                            calc: newRecipe.calcs,
                            name: newRecipe.name,
                            description: newRecipe.description,
                            createdDate: firebase.database.ServerValue.TIMESTAMP,
                            imageUrl: url
                        }
                    });
                    return database.ref('recipes/').set(recipes)
                })
                .then(
                    res => {
                        alert('Success');
                        dispatch(handleResponse(actions.ADD_RECIPE_SUCCESS))
                    },
                    err => {
                        alert('Upload Failed');
                        dispatch(handleResponse(actions.ADD_RECIPE_FAILURE, err))
                    }
                );
            } else {
                recipes.push({
                    id: key,
                    recipe: {
                        calc: newRecipe.calcs,
                        name: newRecipe.name,
                        description: newRecipe.description,
                        createdDate: firebase.database.ServerValue.TIMESTAMP,
                        imageUrl: null
                    }
                });
                database.ref('recipes/').set(recipes)
                .then(
                    res => {
                        alert('Success')
                        dispatch(handleResponse(actions.ADD_RECIPE_SUCCESS))
                    },
                    err => {
                        alert('Upload Failed')
                        dispatch(handleResponse(actions.ADD_RECIPE_FAILURE, err))
                    }
                )
            }
        });
    }
}
 
function setRecipes(recipes) {
    console.log(recipes);
    return {
        type: actions.SET_RECIPES_DATA,
        payload: recipes
    }
};

export function watchRecipes() {
    return dispatch => {
        firebase.database().ref('/recipes').on('value', function(snapshot) {
            dispatch(setRecipes(snapshot.val()));
        },
        function(error) {

        })
    };
}