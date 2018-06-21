import React, { Component } from 'react';
import { View, TouchableOpacity, Picker } from 'react-native';
import { RkText, RkTextInput, RkButton } from 'react-native-ui-kitten';

export default class FlavorItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    onPress() {
        const visible = this.state.visible;
        this.setState({
            visible: !visible
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.onPress()} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <RkText>{this.props.flavor.name}</RkText>
                    <RkText>{this.props.flavor.percentage}</RkText>
                </TouchableOpacity>
                <View style={{padding: 20, display: this.state.visible ? 'flex' : 'none'}}>
                    <RkTextInput
                        label={'Name'}
                        value={this.props.flavor.name}
                        rkType='right clear'
                        onChangeText={this.props.onChangeName}
                    />
                    <RkTextInput
                        label={'Percentage'}
                        value={this.props.flavor.percentage}
                        keyboardType='numeric'
                        rkType='right clear'
                        onChangeText={this.props.onChangePercentage}
                    />
                    <Picker
                        selectedValue={this.props.flavor.weight_src}
                        style={{ height: 50, width: 100 }}
                        onValueChange={this.props.onChangeWeight}
                    >
                        <Picker.Item label="VG" value="VG" />
                        <Picker.Item label="PG" value="PG" />
                    </Picker>
                    <RkButton onPress={this.props.onPressRemove}>
                        Remove
                    </RkButton>
                </View>
            </View>
        )
    }
}