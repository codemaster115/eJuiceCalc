import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTextInput
} from 'react-native-ui-kitten';
import {SocialBar} from '../../components';
import {data} from '../../data';
import {FontAwesome} from '../../assets/icons';

import { connect } from 'react-redux';
import { watchRecipes } from '../../actions/recipe';
import moment from 'moment';

class RecipesPage extends React.Component {
  static navigationOptions = {
    title: 'Recipes: NUMBER'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = data.getArticles('fact');
    this.renderHeader = this._renderHeader.bind(this);
    this.renderItem = this._renderItem.bind(this);

    this.props.dispatch(watchRecipes());
  }

  _keyExtractor(post) {
    return post.id;
  }

  //Mike Fix This - Search header for the top of public Recipes
  _renderHeader() {
    return (
      <View style={styles.searchContainer}>
        <RkTextInput autoCapitalize='none'
                     autoCorrect={false}
                     onChange={(event) => this._filter(event.nativeEvent.text)}
                     label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
                     rkType='row'
                     placeholder='Search'/>
      </View>
    )
  }

  _renderItem(info) {
    const { recipe } = info.item;

    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('RecipeDetail', {id: info.item.id})}>
      	<RkCard rkType='horizontal' style={styles.card}>
        	<Image rkCardImg source={{uri: recipe.imageUrl}}/>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{recipe.name}</RkText>
            <RkText rkType='secondary2 hintColor'>{moment(recipe.createdDate).fromNow()}</RkText>
            {/* <RkText rkType='secondary6 hintColor'>{recipe.calc.amountPG}</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>{recipe.calc.amountVG}</RkText> */}
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.recipes.reverse()}
          renderHeader={this.renderHeader}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
      </View>
    )
  }
}


let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13
  }
}));

const mapStateToProps = state => ({
  recipes: state.recipe.recipes
});

export const Recipes = connect(mapStateToProps)(RecipesPage);
