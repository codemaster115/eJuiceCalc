import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';
import article from '../screens/articles/article';

//
// Initial State...
//

const initialState = {
    personData: { },
    articleDate: {

    }
  }

//
// Reducer...
//
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'setArticle':
      return {...state, articleDate: action.value}
  }
}

//
// Store...
//
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

const setArticleData = (articleData) => {
  return {
    type: 'setArticleData',
    value: ArticleData
  }
}

const watchArticleData =() =>
{
  return function(dispatch) {
    firebase.database().ref("Article").on('value', function(snapshot) {
      var ArticleData =  snapshot.val();
      
      dispactch(setArticleData(ArticleData));
    },
    function(error) {

    })
  };
}

export { setArticleData, watchArticleData };