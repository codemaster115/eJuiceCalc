import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import {data} from '../../data';
import {Avatar} from '../../components';
import {SocialBar} from '../../components';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { setArticleData, watchArticleData } from '../../redux/app-redux'

let moment = require('moment');

const mapStateToProps = (state) => {
  return {
    ArticleData: state.ArticleData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchArticleData: () => {dispatch(watchArticleData())},
  };
}


export class Article extends React.Component {
  static navigationOptions = {
    title: 'RECIPE NAME'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    this.data = data.getArticle(id);
    this.props.watchArticleData();
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#e0e0e040'}}>
          <View>
            <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
            <RkText rkType='secondary2 hintColor'>{moment().add(this.data.time, 'seconds').fromNow()}</RkText>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.user.id})}>
            <Avatar rkType='circle' img={this.data.user.photo}/>
          </TouchableOpacity>
        </View>
        <ScrollView >

          <RkCard rkType='article'>
            <Image rkCardImg source={this.data.photo}/>          
            <View rkCardFooter>
              <SocialBar/>
            </View>
          </RkCard>
            {/* <View rkCardHeader>
              <View>
                <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
                <RkText rkType='secondary2 hintColor'>{moment().add(this.data.time, 'seconds').fromNow()}</RkText>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.user.id})}>
                <Avatar rkType='circle' img={this.data.user.photo}/>
              </TouchableOpacity>
            </View> */}
            <View rkCardContent>
              <View style={[styles.userInfo, styles.bordered]}>
                <View style={styles.section}>
                  <RkText rkType='header3' style={styles.space}>{this.props.Article.photo}</RkText>
                  <RkText rkType='secondary1 hintColor'>Nicotine base</RkText>
                  <RkText rkType='secondary1 hintColor'>VG</RkText>
                  <RkText rkType='secondary1 hintColor'>PG</RkText>
                  <RkText rkType='secondary1 hintColor'>Flavour 1</RkText>
                  <RkText rkType='header3' style={styles.space}>Sum</RkText>
                </View>
                <View style={styles.section}>
                  <RkText rkType='header3' style={styles.space}>ml</RkText>
                  <RkText rkType='secondary1 hintColor'>11.11</RkText>
                  <RkText rkType='secondary1 hintColor'>32.44</RkText>
                  <RkText rkType='secondary1 hintColor'>44.44</RkText>
                  <RkText rkType='secondary1 hintColor'>12.00</RkText>
                  <RkText rkType='header3' style={styles.space}>100.00</RkText>                                     
                </View>
                <View style={styles.section}>
                  <RkText rkType='header3' style={styles.space}>grams</RkText>
                  <RkText rkType='secondary1 hintColor'>12.49</RkText>
                  <RkText rkType='secondary1 hintColor'>40.92</RkText>
                  <RkText rkType='secondary1 hintColor'>46.10</RkText>
                  <RkText rkType='secondary1 hintColor'>13.93</RkText>
                  <RkText rkType='header3' style={styles.space}>113.44</RkText>  
                </View>
              </View>
              <View>
                <RkText rkType='primary3 bigLine'>Suggested steep time: 5 days

                  Strength: 3 mg
                  PG/VG-ratio: 35/65
                  Flavor total: 3.6 ml / 3.6g (12%)

                  Notes
                  Bright fresh strawberry with a tart twang.</RkText>
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },  
}));

// export default connect(mapStateToProps, mapDispatchToProps)(Article);