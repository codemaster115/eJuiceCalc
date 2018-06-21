import React from 'react';
import { View, ScrollView } from 'react-native';
import { RkText, RkStyleSheet, RkButton, RkTextInput } from 'react-native-ui-kitten';
import { ImagePicker, Permissions } from 'expo';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import { connect } from 'react-redux';
import { addRecipe, watchRecipes } from '../../actions/recipe';

const tableHead = ['Add', 'ml', 'gram', 'drop'];
const tableTitle = ['Nicotine', 'VG', 'PG'];

class RecipeCalcPage extends React.Component {
    static navigationOptions = {
      title: 'Your Recipe'.toUpperCase()
    };

    constructor(props) {
      super(props);
  
      this.state = {
        camera_visible: true,
        image: null,
        name: '',
        description: '',
      }

      this.props.dispatch(watchRecipes());
    }

    _pickImage = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };

    onPressSave() {
      const calcs = this.props.navigation.state.params;
      const newRecipe = {
        calcs,
        name: this.state.name,
        description: this.state.description,
        imgUri: this.state.image
      };

      this.props.dispatch(addRecipe(newRecipe));
    }

    render() {
      let { image } = this.state;
      const amountML = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountML || 'Some default value';
      const amountdrops = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountdrops || 'Some default value';
      const amountgrams = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountgrams || 'Some default value';
      const amountVG = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountVG || 'Some default value';
      const amountVGdrops = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountVGdrops || 'Some default value';
      const amountVGgrams = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountVGgrams || 'Some default value';
      const amountPG = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountPG || 'Some default value';
      const amountPGdrops = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountPGdrops || 'Some default value';
      const amountPGgrams = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountPGgrams || 'Some default value';
      const amountNIC = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountNIC || 'Some default value';
      const amountNICml = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountNICml || 'Some default value';
      const amountNICdrops = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountNICdrops || 'Some default value';
      const amountNICgrams = this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.amountNICgrams || 'Some default value';
      const flavors = this.props && this.props.navigation.state.params && this.props.navigation.state.params.flavors || [];

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
        <ScrollView style={styles.root}>
          {/* <View style={[styles.userInfo, styles.bordered]}>
          </View> */}

          <RkTextInput
            value={this.state.name}
            onChangeText={(value) => this.setState({name: value})}
            rkType='bordered'
            placeholder='Recipe Name'
          />
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

          <View style={styles.note}>
            <RkText rkType='header3'>Notes:</RkText>
            <RkTextInput
              value={this.state.description}
              onChangeText={(value) => this.setState({description: value})}
              rkType='bordered'
              multiline
              numberOfLines={5}
              underlineColorAndroid='transparent'
              inputStyle={{height: 100}}
            />
          </View>
          <View style={styles.buttons}>
            <RkButton onPress={this._pickImage} style={styles.button} rkType='clear link'>TAKE PHOTO</RkButton>
            <View style={styles.separator}/>
            <RkButton
              style={styles.button}
              rkType='clear link'
              onPress={this.onPressSave.bind(this)}
            >
              SAVE
            </RkButton>
          </View>
        </ScrollView>
      );
    }
}
  
let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: 'center'
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

const mapStateToProps = state => ({
  recipe: state.recipe
});

export const RecipeCalc = connect(mapStateToProps)(RecipeCalcPage);