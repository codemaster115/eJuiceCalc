import React from 'react';
import { View, ScrollView } from 'react-native';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import Camera from '../../components/Camera';
import { ImagePicker } from 'expo';

export class RecipeCalc extends React.Component {
    static navigationOptions = {
      title: 'Your Recipe'.toUpperCase()
    };

    constructor(props) {
      super(props);
  
      this.state = {
        camera_visible: true,
        image: null,
      }
    }
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
    render() {
    let { image } = this.state;
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

    console.log(amountVG)
    console.log(amountVGdrops)
    console.log(amountVGgrams)
    console.log(amountPG)
    console.log(amountPGdrops)
    console.log(amountPGgrams)
    console.log(amountNIC)
    console.log(amountNICml)
    console.log(amountNICdrops)
    console.log(amountNICgrams)
        return (
          <ScrollView style={styles.root}>
          <View style={[styles.userInfo, styles.bordered]}>
            <View style={styles.section}>
              <RkText rkType='header3' style={styles.space}>Add</RkText>
              <RkText rkType='secondary1 hintColor'>Nicotine</RkText>
              <RkText rkType='secondary1 hintColor'>VG</RkText>
              <RkText rkType='secondary1 hintColor'>PG</RkText>
              <RkText rkType='header3' style={styles.space}>Sum</RkText>
            </View>
            <View style={styles.section}>
              <RkText rkType='header3' style={styles.space}>ml</RkText>
              <RkText rkType='secondary1 hintColor'>{amountNICml}</RkText>
              <RkText rkType='secondary1 hintColor'>{amountVG}</RkText>
              <RkText rkType='secondary1 hintColor'>{amountPG}</RkText>
              <RkText rkType='header3' style={styles.space}>100.00</RkText>
            </View>
            <View style={styles.section}>
              <RkText rkType='header3' style={styles.space}>gram</RkText>
              <RkText rkType='secondary1 hintColor'>{amountNICgrams}</RkText>
              <RkText rkType='secondary1 hintColor'>{amountVGgrams}</RkText>
              <RkText rkType='secondary1 hintColor'>{amountPGgrams}</RkText>
              <RkText rkType='header3' style={styles.space}>113.44</RkText>  
            </View>
            <View style={styles.section}>
              <RkText rkType='header3' style={styles.space}>drop</RkText>
              <RkText rkType='secondary1 hintColor'>{amountNICdrops}</RkText>
              <RkText rkType='secondary1 hintColor'>{amountVGdrops}</RkText>
              <RkText rkType='secondary1 hintColor'>{amountPGdrops}</RkText>
              <RkText rkType='header3' style={styles.space}>113.44</RkText>  
            </View>            
          </View>

          <View style={styles.buttons}>
            <RkButton onPress={this._pickImage} style={styles.button} rkType='clear link'>TAKE PHOTO</RkButton>
            <View style={styles.separator}/>
            <RkButton onPress={() => {
            this.props.navigation.navigate('GridV1')
          }} style={styles.button} rkType='clear link'>SAVE</RkButton>
          </View>
          {/* <Camera hide={this.state.camera_visible} /> */}
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
  }
}));