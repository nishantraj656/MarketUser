import React from 'react';

import {
            ActivityIndicator,
            AsyncStorage,
            Button,
            StatusBar,
            StyleSheet,
            TouchableOpacity,
            Image,
            View,
            Text,
            FlatList,
            ScrollView
        } from 'react-native';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


export default class ShopDetails extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.obj,
        }
    }
    render(){
    
     return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",height:800}}>
    
         <View style={{ flex:1,
                                        backgroundColor:'#f2d56d', 
                                        padding:5,
                                       
                                        height:100, 
                                        borderRadius:5,
                                        borderWidth:1,}}>
             <View style={{borderWidth:1,flex:1,borderRadius:5}}>
                 <Image style={{width: '100%', height: 150,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                 <Image style={{width: '100%', height: 150,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
             
             </View> 
             <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:20,fontWeight:'900'}}>uii</Text>
             </View>

             <View style={{justifyContent:'space-around',flexDirection:'row'}}>
             <Text style={{fontSize:15,fontWeight:'900'}}>Price:78 Rs/kg</Text>
             
             </View>
             
            

             <View>
             <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>yuuu</Text>
             </View>
             <View style={{justifyContent:'space-around',flexDirection:'row'}}>
             <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
             <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
             </View>
         </View>
         <ScrollView>
         <View >
             <Text>io</Text></View>
         </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
            <Button title="Add to cart" color="#f7c927" onPress={()=>{ }}/>
            <Button title="Cancel" color="#f7c927" onPress={()=>{this.state.obj.goBack(); }}/>
            
        </View>
    
    
     </View>
       )
    }
}