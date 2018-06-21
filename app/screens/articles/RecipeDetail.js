import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import {data} from '../../data';
import {Avatar} from '../../components';
import {SocialBar} from '../../components';
import {connect} from 'react-redux';
import { watchRecipes } from '../../actions/recipe';
import _ from 'lodash';

let moment = require('moment');

const tableHead = ['Add', 'ml', 'gram', 'drop'];
const tableTitle = ['Nicotine', 'VG', 'PG'];

class Page extends React.Component {
  static navigationOptions = {
    title: 'RECIPE NAME'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    this.data = data.getArticle(id);
  }

  render() {
    const id = this.props.navigation.state.params.id;
    const recipe = _.find(this.props.recipe.recipes, (recipe) => recipe.id == id).recipe;

    const {
      amountML,
      amountdrops,
      amountgrams,
      amountVG,
      amountVGdrops,
      amountVGgrams,
      amountPG,
      amountPGdrops,
      amountPGgrams,
      amountNICml,
      amountNICdrops,
      amountNICgrams,
      flavors
    } = recipe.calc;

    const array_NIC = [];
    array_NIC.push(amountNICml.toString());
    array_NIC.push(amountNICgrams.toString());
    array_NIC.push(amountNICdrops.toString());

    const array_VG = [];
    array_VG.push(amountVG.toString());
    array_VG.push(amountVGgrams.toString());
    array_VG.push(amountVGdrops.toString());

    const array_PG = [];
    array_PG.push(amountPG.toString());
    array_PG.push(amountPGgrams.toString());
    array_PG.push(amountPGdrops.toString());

    const table_rows = [];
    table_rows.push(array_NIC);
    table_rows.push(array_VG);
    table_rows.push(array_PG);

    const tableTileHeightArr = [28,28,28];

    const flavors_data = flavors.map((flavor) => {
      const data = [];
      data.push(`${flavor.name}: ${flavor.percentage}%`);
      data.push(flavor.amountMLRounded.toString());
      data.push(flavor.amountgrams.toFixed(3));
      data.push(flavor.amountdrops.toString());

      return data;
    });

    const sum_data = ['Sum'];
    sum_data.push(amountML);
    sum_data.push(amountgrams);
    sum_data.push(amountdrops);

    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#e0e0e040'}}>
          <View>
            <RkText style={styles.title} rkType='header4'>{recipe.name}</RkText>
            <RkText rkType='secondary2 hintColor'>{moment(recipe.createdDate).fromNow()}</RkText>
          </View>
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.user.id})}>
            <Avatar rkType='circle' img={this.data.user.photo}/>
          </TouchableOpacity> */}
        </View>
        <ScrollView>

          <RkCard rkType='article'>
            <Image rkCardImg source={{uri: recipe.imageUrl}}/>          
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
              <Table
                style={styles.table}
                borderStyle = {{borderWidth: 0}}
              >
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.table_head} textStyle={styles.header_text}/>

                <TableWrapper style={{flexDirection: 'row'}}>
                  <Col data={tableTitle} style={styles.table_title} heightArr={tableTileHeightArr} textStyle={styles.row_text}/>
                  <Rows data={table_rows} style={styles.table_row} flexArr={[1, 1, 1]} textStyle={styles.row_text}></Rows>
                </TableWrapper>
                <Rows data={flavors_data} flexArr={[1, 1, 1, 1]} style={styles.table_row_flavor} textStyle={styles.row_text}/>
                <Row data={sum_data} flexArr={[1,1,1,1]} style={styles.table_result} textStyle={styles.row_text}/>
              </Table>

              <View>
                <RkText rkType='primary3 bigLine'>{recipe.description}</RkText>
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
  table: {
    backgroundColor: 'lightgrey'
  },
  table_head: {
    height: 40,
    backgroundColor: '#eeeeee',
  },
  table_wrapper: {
    flexDirection: 'row',
    backgroundColor: '#dddddd',
    borderColor: 'red',
  },
  table_title: {
    flex: 1,
    backgroundColor: '#dddddd',
  },
  table_row: {
    height: 28
  },
  table_row_flavor: {
    height: 30,
    backgroundColor: '#aaf'
  },
  table_result: {
    height: 30,
    backgroundColor: '#aaaaaa',
  },
  row_text: {
    textAlign: 'center'
  },
  header_text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
}));

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchRecipes: () => {dispatch(watchRecipes())},
  };
}

export const RecipeDetail = connect(mapStateToProps, mapDispatchToProps)(Page);