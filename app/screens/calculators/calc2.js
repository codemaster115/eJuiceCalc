import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTextInput,
  RkTheme
} from 'react-native-ui-kitten';
import {
  RkSwitch,
  FindFriends
} from '../../components';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components';

export class CalculatorTwo extends React.Component {
  static navigationOptions = {
    title: 'Calculator'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      amount: '10',
      strength: '6',
      diluent: '0',
      pg: '50',
      vg: '50',
      nicStrength: '18',
      nicVG: '50',
      nicPG: '50',
      flavour: '20'
    }
  }

  update = () => {
    const { pg, vg } = this.state;
  
    if (pg > 100 | pg < 0){
      //Handle Error Messages Here
    }
    else {this.setState({
        vg: (100 - pg).toString()
      });
    }
  }

  updateTwo = () => {
    const { pg, vg } = this.state;
    if (vg > 100 | vg < 0){
      //Handle Error Messages Here
    }  
    this.setState({
      pg: (100 - vg).toString()
    });
  }

  updateThree = () => {
    const { nicPG, nicVG } = this.state;
    if (nicPG > 100 | nicPG < 0){
      //Handle Error Messages Here
    }  
    this.setState({
      nicVG: (100 - nicPG).toString()
    });
  }

  updateFour = () => {
    const { nicPG, nicVG } = this.state;
    if (nicVG > 100 | nicVG < 0){
      //Handle Error Messages Here
    }  
    this.setState({
      nicPG: (100 - nicVG).toString()
    });
  }  

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>Calculagfdsgator</RkText>
          </View>
          <View style={styles.row}>
              <RkTextInput label='Amount to Make (ml)'
                           value={this.state.amount}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({amount: text})}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Desired Nic Strength (%)'
                           value={this.state.strength}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({strength: text})}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Extra Diluent (%)'
                           value={this.state.diluent}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({diluent: text})}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Desired PG (%)'
                           value={this.state.pg}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({pg: text})}
                           onSubmitEditing={this.update}
                           onBlur={this.update}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Desired VG (%)'
                           value={this.state.vg}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({vg: text})}
                           onSubmitEditing={this.updateTwo}
                           onBlur={this.updateTwo}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Nicotine Strength (%)'
                           value={this.state.nicStrength}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({nicStrength: text})}/>
            </View>            
            <View style={styles.row}>
              <RkTextInput label='Nicotine PG (%)'
                           value={this.state.nicPG}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({nicPG: text})}
                           onSubmitEditing={this.updateThree}
                           onBlur={this.updateThree}/>
            </View>   
            <View style={styles.row}>
              <RkTextInput label='Nicotine VG (%)'
                           value={this.state.nicVG}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({nicVG: text})}
                           onSubmitEditing={this.updateFour}
                           onBlur={this.updateFour}/>
            </View> 
            <View style={styles.row}>
              <RkTextInput label='Flavour 1 (%)'
                           value={this.state.flavour}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({flavour: text})}/>
            </View> 
        </View>
        <GradientButton onPress={() => {
            this.props.navigation.navigate('Recipe1', {
              amount: this.state.amount,
              strength: this.state.strength,
              diluent: this.state.diluent,
              pg: this.state.pg,
              vg: this.state.vg,
              nicStrength: this.state.nicStrength,
              nicPG: this.state.nicPG,
              nicVG: this.state.nicVG,
              flavour: this.state.flavour
            });
          }} rkType='large' style={styles.button} text='Calculate'/>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  switch: {
    marginVertical: 14
  },
  save: {
    marginVertical: 20
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  }
}));