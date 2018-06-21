import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTextInput
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components';
import FlavorItem from '../../components/FlavorItem';
import _ from 'lodash';

export class Calculator extends React.Component {
  static navigationOptions = {
    title: 'Calculator'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      amount: '10',
      strength: '6',
      diluent: '0',
      pg: '60',
      vg: '40',
      nicStrength: '18',
      nicPG: '50',
      nicVG: '50',
      flavour: '20',
      flavors: [],
      flavorsSum: {
        all: '',
        pg: '',
        vg: '',
      },
      //Default Weights
      weightVG: 1.249,
      weightPG: 1.0361,
      drops: 30,
      nicPureMg: 1.01
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

  calculate = () => {
    //VG Values
    const amountVG = this.leftoverVgMl();
    //VG ML Rounded
    const amountVGmlrounded = amountVG.toFixed(3);
    //VG Drops
    const amountVGdrops = this.ml_to_drops(amountVG);
    //VG Grams
    const amountVGgrams = this.ml_to_grams_vg(amountVG);
    const amountVGgramsRounded = amountVGgrams.toFixed(3);

    //PG Values
    const amountPG = this.leftoverPgMl();
    //PG ML Rounded
    const amountPGrounded = amountPG.toFixed(3);
    //PG Drops
    const amountPGdrops = this.ml_to_drops(amountPG);
    //PG Grams
    const amountPGgrams = this.ml_to_grams_pg(amountPG);
    const amountPGgramsRounded = amountPGgrams.toFixed(3);
    //NIC Values
    const amountNIC = this.nicPercentage();
    //NIC ML
    const amountNICml = this.percent_to_ml(amountNIC);
    //NIC Rounded
    const amountNICRounded = amountNICml.toFixed(3);
    //NIC Drops
    const amountNICdrops = this.ml_to_drops(amountNICml.toFixed(0));
    //NIC Grams
    const amountNICgrams = this.ml_to_grams_nic(amountNICml);
    const amountNICgramsRounded = amountNICgrams.toFixed(3);

    const flavors = this.state.flavors.map(flavor => {
      const amountML = this.percent_to_ml(flavor.percentage);
      const amountMLRounded = amountML.toFixed(3);
      const amountdrops = this.ml_to_drops(amountML.toFixed(0));
      const amountgrams = flavor.weight_src == "PG" ? this.ml_to_grams_pg(amountML) : this.ml_to_grams_vg(amountML);

      return {
        ...flavor,
        amountMLRounded,
        amountdrops,
        amountgrams
      }
    });

    const grams = amountVG + amountPG + amountNICgrams + _.sumBy(flavors, (flavor) => flavor.amountgrams)
    this.props.navigation.navigate('Recipe1', {
      amountML: this.state.amount,
      amountdrops: this.ml_to_drops(this.state.amount),
      amountgrams: grams.toFixed(3),
      amountVG: amountVGmlrounded,
      amountVGdrops: amountVGdrops,
      amountVGgrams: amountVGgramsRounded,
      amountPG: amountPGrounded,
      amountPGdrops: amountPGdrops,
      amountPGgrams: amountPGgramsRounded,
      amountNIC: amountNIC,
      amountNICml: amountNICRounded,
      amountNICdrops: amountNICdrops,
      amountNICgrams: amountNICgramsRounded,
      flavors
    });
  }

  addFlavor = () => {
    const newflavors = this.state.flavors;
    newflavors.push({
      name: "Flavor " + (newflavors.length + 1),
      percentage: 0,
      weight_src: "PG",
      custom_weight: 1,
      id: _.uniqueId()
    });

    this.setState({flavors: newflavors})
  }

  removeFlavor = (id) => {
    const prevFlavors = this.state.flavors;
    this.setState({
      flavors: _.filter(prevFlavors, flavor => (flavor.id == id) ? false : true)
    });
  }

  ml_to_grams_vg = (ml) => {
    return ml * parseFloat(this.state.weightVG)
  }

  ml_to_grams_pg = (ml) => {
    return ml * parseFloat(this.state.weightPG)
  }

  ml_to_grams_nic = (ml) => {
    const nicWeight = this.nicWeight()
    return ml * parseFloat(nicWeight)
  }  

  leftoverVgMl = () =>{
    const { amount, vg } = this.state;
    const np = this.nicPercentageLiquidsVG()
    console.log("This is the nicpercentage of VG" + np)
    const amountVG = amount * ((parseFloat(vg) - parseFloat(this.flavorsSum(this.state.flavors).vg) - parseFloat(np)) / 100)
    return amountVG
  }

  leftoverPgMl = () => {
    const { amount, pg } = this.state;
    const np = this.nicPercentageLiquidsPG()
    console.log("This is the nicpercentage of pg" + np)
    const amountPG = amount * ((parseFloat(pg) - parseFloat(this.flavorsSum(this.state.flavors).pg) - parseFloat(np)) / 100)
    return amountPG
  }
  
  nicPercentage = () => {
    const { strength, nicStrength } = this.state;
    const s = (strength / nicStrength) * 100
    return s
  }

  nicPercentageLiquidsVG = () => {
    const {vg} = this.state
    const total = this.nicPercentage();
    return total * (vg / 100)
  }

  nicPercentageLiquidsPG = () => {
    const {pg} = this.state
    const total = this.nicPercentage();
    return total * (pg / 100)
  }

  nicPercentages = () => {
    const { strength, pg, vg } = this.state
    const nic_percent = (strength / 10)
      return {
        pg: (pg) - ((nic_percent / 10) * (pg / 10)),
        vg: (vg) - ((nic_percent / 10) * (vg / 10)),
        nic: nic_percent
      };
  }

  nicWeight = () => {
    const { weightPG, weightVG, nicPureMg } = this.state;
    const pg = this.nicPercentages().pg
    const vg = this.nicPercentages().vg
    const nic = this.nicPercentages().nic
    /**
    * Calculates the weight of the nicotine base, based on the nicotine weight
    * devided into it's respective VG or PG percentages accordingly (does not just split it 50/50)
    */
    return  (
      (weightPG  * (pg / 10)) +
      (weightVG  * (vg / 10)) +
      (nicPureMg * (nic / 10))
    ) / 10;
  }

  ml_to_drops = (ml) => {
    return ml * this.state.drops
  }

  ml_to_mg = (ml, weightSrc, custom) => {
    if(weightSrc == "PG") { weight = this.state.weightPG; } else
    if(weightSrc == "VG") { weight = this.state.weightVG; } else
    if(custom)            { weight = custom; }

    return parseFloat(ml) * parseFloat(weight);
  }

  percent_to_ml = (percentage) => {
    return this.state.amount * ( parseFloat(percentage) / 100 );
  }

  flavorsSum = (flavors) => {
    return {
      all: _.sumBy(flavors, function(o){
        return parseFloat(o.percentage);
      }),
      // Sum VG flavors
      pg: _.sumBy(flavors, function(o){
        return (o.weight_src == "VG") ? 0: parseFloat(o.percentage);
      }),
      //Sum PG flavors
      vg: _.sumBy(flavors, function(o){
        return (o.weight_src == "VG") ? parseFloat(o.percentage): 0;
      })
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'></RkText>
          </View>     
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>Target Batch</RkText>
          </View>
          <View style={styles.row}>
              <RkTextInput label='Amount to Make (ml)'
                           value={this.state.amount}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({amount: text})}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Desired Nic Strength (mg/ml)'
                           value={this.state.strength}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({strength: text})}/>
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
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='primary header6'>What you have</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Nicotine Strength (mg/ml)'
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
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='primary header6'>Flavours</RkText>
            </View>
            <View style={styles.row}>
              <FlatList
                extraData={this.state}
                data={this.state.flavors}
                renderItem={({item}) => 
                  <FlavorItem
                    flavor={item}
                    deleteFlavor={() => this.deleteFlavor(item.id)}
                    onChangeName={(value) => {
                      const flavors = this.state.flavors.map(flavor => {
                        if (flavor.id == item.id) {
                          const newFlavor = flavor;
                          newFlavor.name = value;
                          return newFlavor;
                        } else {
                          return flavor
                        }
                      });
                      this.setState({flavors});
                    }}
                    onChangePercentage={(value) => {
                      const flavors = this.state.flavors.map(flavor => {
                        if (flavor.id == item.id) {
                          const newFlavor = flavor;
                          newFlavor.percentage = value;
                          return newFlavor;
                        } else {
                          return flavor
                        }
                      });
                      this.setState({flavors});
                    }}
                    onChangeWeight={(itemValue) => {
                      const flavors = this.state.flavors.map(flavor => {
                        if (flavor.id == item.id) {
                          const newFlavor = flavor;
                          newFlavor.weight_src = itemValue;
                          return newFlavor;
                        } else {
                          return flavor
                        }
                      });
                      this.setState({flavors});
                    }}
                    onPressRemove={() => this.removeFlavor(item.id)}
                  />
                }
              />
            </View>
            <View style={styles.row}>
              <RkTextInput label='Extra Diluent (%)'
                           value={this.state.diluent}
                           keyboardType='numeric'
                           rkType='right clear'
                           onChangeText={(text) => this.setState({diluent: text})}/>
            </View>
        </View>
        <GradientButton rkType='medium' style={styles.button} text='Add Flavor' onPress={this.addFlavor}/>
        <GradientButton rkType='medium' style={styles.button} text='Calculate' onPress={this.calculate}/>
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
    marginBottom: 20
  },
    red: {
    color: '#ff0000'
  }
}));