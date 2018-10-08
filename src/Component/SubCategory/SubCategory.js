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
import Connection from '../../Global/Connection/Connection';
import { SearchBar } from 'react-native-elements'



export default class SubCategory extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            data:[],//store data of sub-category items
            process:false,
            obj:this.props.obj,
            sql:this.props.sql,
            isEmpty:'Wait List is Loading.....',
            serachText:"",
            fullData:'',
        }
        this.conn = new Connection();
    }

    componentWillMount(){
        console.log(this.state.sql);
        this._inslized();
    }

    _inslized=async()=>{ 
        console.log(this.state.sql)
       let value = await this.conn.Query(this.state.sql)
        if(value.flag){
            this.setState({data:value.data,fullData:value.data});  
            console.log(this.state.data);  
        }
        this.setState({isEmpty:"List is empty..."})
    }

    _storeData=async(subID) =>{
        try{
            await AsyncStorage.setItem('subID',subID);
            this.state.obj.navigate('ProductList');
        }
        catch(error){
            console.log("Eroor he Product list me ",error);
        }
    }
    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,'+item.subcategory_pic;

        return(
            <View style={{flex:1,padding:5}}>
                  <TouchableOpacity onPress={()=>{this._storeData(item.subcategory_id) }} >
                        <View style={{ flex:1,
                                        backgroundColor:'#f2d56d', 
                                        padding:5,
                                       
                                        height:100, 
                                        borderRadius:5,
                                        borderWidth:1,}}>
                        <View style={{width: '100%',justifyContent:'center',}}>
                            <Image style={{width: '100%',borderRadius:5,flex:1}} source={{uri:yourBase64Icon}}/>
                        </View> 
                        <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                            <Text style={{fontSize:14,}}>{item.subcategory_name}</Text>
                        </View>

                    </View>
                    
                </TouchableOpacity>
            </View>           
                        
        );
        
    }   

    _onChangeText=(text) =>{
        try {
            console.log(text);
            let local = this.state.fullData;
            let temp =[];
            local.forEach(element => {
               if(element.subcategory_name.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 ){
                   temp.push(element);
                   console.log(element)
               } else{ console.log(element)} 
            });
            this.setState({data:temp});
                     
            
        } catch (error) {
            console.log(error)
        }
    }

    _onClearText=(text) =>{
       try {
       //    this.setState({data:fullData});
       //     console.log(text);
           
       } catch (error) {
           
       }
   }
    
    render(){
    
        return(<View style={{width:'100%',flex:1,padding:10,}}>
            
            <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
                     <ScrollView>                   
                         <FlatList
                        data={this.state.data}
                        renderItem={this._renderIteam}
                        keyExtractor={item =>item.subcategory_id}
                        numColumns='3'
                        ListEmptyComponent={()=>{
                            if(this.state.isEmpty =='Wait List is Loading.....')
                             return(<View style={{justifyContent:'center'}}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                    <Text>{this.state.isEmpty}</Text>

                                </View>);
                            else
                            return(<View style={{justifyContent:'center'}}>
                                    <Text>{this.state.isEmpty}</Text>

                                    </View>)}}
                        
                        />
                    </ScrollView>

                </View>);
    }
}