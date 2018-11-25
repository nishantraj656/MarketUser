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
        } from 'react-native';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Connection from '../Global/Connection/Connection';
import { ModalNavigator } from '../Component/Category/CategoryMenu';



     

export default class MainCategory extends React.Component 
{
    constructor(props){
        super(props);
        this.state={
            data:[
                    {key:'1',name:'Grocery',tableName:'Grocery',uri:'https://source.wustl.edu/wp-content/uploads/2018/01/Groceries-2018-760x507.jpg'},
                    {key:'2',name:'Restaurant',tableName:'category_table',
                    uri:'data:image/jpeg;base64,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'},
                    {key:'3',name:'Services',tableName:'work_list',
                    uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OV3uEDDArofnqg-rLNjJa5ObxJQiWkbN2IMo3VU_Z1rLlhyKmQ'},
                    
                ],//store data of category items
            process:false,
            obj:this.props.obj,
           
        }
     
    }

    _storeData=async(cID)=>{
        try{
            await AsyncStorage.setItem('categoryID',cID);
            this.state.obj.navigate('SubCategory');
        }catch(error){
            console.log("Category ",error)
        }
    }

    //List of category items
    _renderItems =({item})=>
    {
      //  console.log(item);
       
            return(
                <TouchableOpacity onPress={()=>{this.props.obj.navigate(item.tableName);}}>
                
                <View style={{borderRadius:10,height:90,width:50,backgroundColor:"#fcfdff"}}>
                   <View style={{height:50,paddingHorizontal:7}}>
                   <Image resizeMode="center" source={{uri:item.uri}} style={{height:80,width:50}}/>
                   </View>
                   
                        
                   
                    <View style={{marginTop:12,alignSelf:'center'}} >
                    <Text style={{fontSize:10,alignSelf:'center'}}>{item.name}</Text> 
                    </View>
                   
                    </View>
                </TouchableOpacity>
            );
        }  

    render()
    {

        return(  
        <View style={{backgroundColor:'#ffffff',flex:1,height:80}}>  
       
        <FlatList 
        data={this.state.data}
        renderItem={this._renderItems}
        ItemSeparatorComponent={()=>{return(<View style={{borderRadius:5,borderColor:'#012160'}}><Text></Text></View>)}}
        ListEmptyComponent={()=>{
            if(this.state.process)
            return(<View style={{justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Wait List is Loading.....</Text>

                </View>);
            else
            return(<View style={{justifyContent:'center'}}>
                    <Text>List is empty or Connection problem......</Text>

                    </View>)}}
        ItemSeparatorComponent={()=>{return(<View style={{backgroundColor:'#f56f43',height:0.5,margin:5}}></View>)}}
        horizontal
        />
        </View>);

    }
   
}