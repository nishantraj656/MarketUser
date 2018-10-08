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
import Connection from '../../Global/Connection/Connection';
import Search from '../../Global/Search';



     

export default class Category extends React.Component 
{
    constructor(props){
        super(props);
        this.state={
            data:[{key:'1'},{key:'2'},{key:'3'},{key:'4'},{key:'5'},{key:'6'},{key:'7'}],//store data of category items
            process:false,
            obj:this.props.obj,
            sql:this.props.sql,
        }
        this.conn = new Connection();
        this.search = new Search();
    }

    componentWillMount(){
        console.log(this.state.sql);
        this._inslized();
    }

    _inslized=async()=>{ 

       let value = await this.conn.Query(this.state.sql)
        if(value.flag){
            this.setState({data:value.data});    
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
        console.log(item);
        var yourBase64Icon = 'data:image/png;base64,'+item.category_pic;
          //  console.log("Value is ",item.category_id);
            return(
                <TouchableOpacity onPress={()=>{this._storeData(item.category_id)}}>
                <View style={{margin:5,borderRadius:10,height:100,backgroundColor:"#fcfdff"}}>
                    <View style={{paddingHorizontal:5,borderRadius:10}}>
                    <View style={{}}>
                    <Image resizeMode="center" source={{uri:yourBase64Icon}} style={{height:50,width:50}}/>
                    </View>
                        <Text>{item.category_name}</Text>  
                    </View>
    
                    
                </View>
                </TouchableOpacity>
            );
        }  

    render()
    {

        return(  
        <View style={{backgroundColor:'#e5ef73',flex:1,height:100,padding:5,marginTop:5}}>  
       
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
        keyExtractor={item =>item.category_id}
        horizontal
        />
        </View>);

    }
   
}