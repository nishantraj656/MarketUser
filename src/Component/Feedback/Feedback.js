import React from 'react';
import { StyleSheet,Text, View,Picker, Button,TouchableOpacity,AsyncStorage, FlatList,ActivityIndicator } from 'react-native';
import {createStackNavigator} from 'react-navigation';


import { ScrollView } from 'react-native-gesture-handler';

export default class Feedback extends React.Component{
    constructor(props){
        super(props);
        this.state={ 

        }
    }

    _interface=()=>{
        return(<View style={{height:300,backgroundColor:'#ffffff',flexDirection:'row',padding:5}}>
                <View>
                <View style={{backgroundColor:'#8733d6',height:50,alignItems:'center'}}>
                <Text style={{color:'#ffffff',fontSize:20}}>Give us your valuable feedback </Text>
                </View>
                <View style={{padding:5}}>
                    <Text style={{color:'#000000',fontSize:17}}>I would greatly appreciate it if you kindly give me some feedback to improve our services .......</Text>
                </View>
                <View style={{padding:5}}>
                    <Text style={{color:'#000000',fontSize:15,fontWeight:'900'}}> 1 ) How did you find about our services ?</Text>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        <Picker.Item label="Online" value="Online" />
                        <Picker.Item label="Newspaper" value="Newspaper" />
                        <Picker.Item label="Shop Window" value="Shop Window" />
                        <Picker.Item label="Friend" value="Friend" />
                        <Picker.Item label="Salespersion Recommended property" value="Salespersion Recommended property" />
                        </Picker>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'900'}}> 2 ) how much staar you give to us ? </Text>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        
                        <Picker.Item label="5 Star" value="5" />
                        <Picker.Item label="4 Star" value="4" />
                        <Picker.Item label="3 Star" value="3" />
                        <Picker.Item label="2 Star" value="2" />
                        <Picker.Item label="1 Star" value="1" />
                        <Picker.Item label="0 Star" value="0" />
                        </Picker>
                </View>
                <View style={{alignSelf:'center'}}>
                    <Button title="  Submit  " onPress={()=>{alert('Thanks for your feedback..')}} />
                </View>
                </View>
        </View>)
    }
} 

