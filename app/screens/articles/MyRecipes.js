import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import {SocialBar} from '../../components';
import {data} from '../../data';
let moment = require('moment');

import { connect } from 'react-redux';

class MyRecipesPage extends React.Component {
  static navigationOptions = {
    title: 'My Recipes'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = data.getArticles();
    this.renderItem = this._renderItem.bind(this);
    this.renderHeader = this._renderHeader.bind(this);
  }

  _keyExtractor(post, index) {
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
        <RkCard style={styles.card}>
          <View rkCardHeader>
            <View>
              <RkText rkType='header4'>{recipe.name}</RkText>
              <RkText rkType='secondary2 hintColor'>{moment(recipe.createdDate).fromNow()}</RkText>
            </View>
          </View>
          <Image rkCardImg source={{uri: recipe.imageUrl}}/>
          <View style={styles.footer} rkCardFooter>
            <SocialBar/>
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.props.recipes}
        renderHeader={this.renderHeader}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  card: {
    marginVertical: 8
  },
  footer: {
    paddingTop: 16
  },
  time: {
    marginTop: 5
  }
}));

const mapStateToProps = state => ({
  recipes: state.recipe.recipes
});

export const MyRecipes =  connect(mapStateToProps)(MyRecipesPage);