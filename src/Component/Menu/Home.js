import React from 'react';
import {
            ActivityIndicator,
            AsyncStorage,
            Button,
            StatusBar,
            StyleSheet,
            TouchableOpacity,
            Image,
            
            
            FlatList,
            ScrollView
        } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Container, Header, Content, Accordion, View, Text } from "native-base";
import MainCategory from '../../MainCategory/MainCategory';
import Slider from '../slider/Slider';

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.obj,
        }
    }

    render(){
        return(<Container>
                    <Content>
                        <View>
                             <MainCategory obj={this.state.obj} />
                        </View>
                         <Slider/>
                    </Content>
        </Container>)
    }

}