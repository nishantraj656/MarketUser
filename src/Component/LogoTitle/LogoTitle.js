import React from 'react';
import { StyleSheet,SectionList, Text,ToastAndroid, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LogoTitle extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cartNo:'0',
            title:'Welcome To MarketG',
            obj:this.props.obj,
        }
       
    }

    componentWillMount(){
        this._Retrive();
    }
    componentDidMount(){
        
    }

    
    
    _Retrive =async()=>{
        try{
            let v =await  AsyncStorage.getItem('CartList');
           // console.log(v)
            if(v==null){
               
            }
            let l =JSON.parse(v).length;
            this.setState({cartNo:l});
    
        }catch(error){
            console.log("Error he logoTitle me ",error)
        }
       
    }

render() {  
    this._Retrive();
  return (
    <View style={{flexDirection:'row',marginTop:20, height:50,backgroundColor:'#110059',justifyContent:'space-between'}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{this.state.obj.toggleDrawer()}} style={{alignSelf:'auto',marginRight:20}} >
            <View>
            <Icon name="menu" size={40} color="#ffffff" /></View>
        </TouchableOpacity> 
        <View style={{height:50,width:50,justifyContent:'center'}}>  
         <Image source={require("../../pic/logo.png")} style={{height:50,width:50}}/>
        </View>
        
    </View>

    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

         <View style={{padding:10}}>
              <Icon name="bell-outline" size={20} color="#ffffff" /> 
        </View>

        <View style={{padding:10}}>
        <TouchableOpacity onPress={()=>{this.state.obj.navigate('MyCart')}}>
            <View style={{backgroundColor:'#ef0202',borderRadius:15}}>
             <Text style={{color:'#ffffff',alignSelf:'center'}}>{this.state.cartNo}</Text>
            </View>
          
             <Icon style={{paddingBottom:10}} name="cart" size={20} color="#ffffff" /> 
        </TouchableOpacity>    
        </View>

         <View style={{padding:10}}>
              <Icon name="magnify" size={20} color="#ffffff" /> 
        </View>

       
    </View>
       
      
    </View>
  );
}
}
