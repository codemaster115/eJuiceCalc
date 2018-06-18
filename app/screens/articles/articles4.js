import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet, RkTextInput
} from 'react-native-ui-kitten';
import _ from 'lodash';
import {SocialBar} from '../../components';
import {data} from '../../data';
import {FontAwesome} from '../../assets/icons';

export class Articles4 extends React.Component {
  static navigationOptions = {
    title: 'Recipes: NUMBER'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = data.getArticles('fact');
    this.renderHeader = this._renderHeader.bind(this);
    this.renderItem = this._renderItem.bind(this);
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
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
      	<RkCard rkType='horizontal' style={styles.card}>
        	<Image rkCardImg source={info.item.photo}/>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'>{`${info.item.user.firstName} ${info.item.user.lastName}`}</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>{info.item.text}</RkText>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.data}
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
