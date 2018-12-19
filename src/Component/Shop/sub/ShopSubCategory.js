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

import { SearchBar } from 'react-native-elements'



export default class ShopSubCategory extends React.Component
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
        //this.conn = new Connection();
    }

    componentWillMount(){
       // console.log(this.state.sql);
        this.fetech();
       // this._inslized();
    }

    fetech = async() =>{

        let value = await AsyncStorage.getItem('ShopID')
       
        let id = await AsyncStorage.getItem('categoryID')
        if(value ==null && id == null){
            
           return; 
   
        }

        await  fetch('http://gomarket.ourgts.com/public/api/Grocery/Shop/sub', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            Shopid:value, 
            id:id
          })
          }).then((response) => response.json())
              .then((responseJson) => {
                
              // console.log(responseJson);
              console.log("Subcategory Load....")
               this.setState({data:responseJson.data.data}) 
            //  console.log("On shop  value :", value);
            }).catch((error) => {
                  
                //  alert("updated slow network");
               console.log( error.message);
              // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
              }); 
  
      }
/**
    _inslized=async()=>{ 
        console.log(this.state.sql)
       let value = await this.conn.Query(this.state.sql)
        if(value.flag){
            this.setState({data:value.data,fullData:value.data});  
            console.log(this.state.data);  
        }
        this.setState({isEmpty:"List is empty..."}) 
    }
 */
    _storeData=async(subID) =>{
        try{
            await AsyncStorage.setItem('subID',JSON.stringify(subID));
            this.state.obj.navigate('ProductList');
        }
        catch(error){
            console.log("Eroor he Product subs",error);
        }
    }
    
    _renderIteam=({item})=>{
                
        let uri;
        try {
          item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=item.pic;  
        } catch (error) {
            uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
        }

        return(
            <View style={{flex:1,padding:5}}>
                  <TouchableOpacity onPress={()=>{this._storeData(item.gro_subcat_id) }} >
                        <View style={{ flex:1,
                                        backgroundColor:'#f2d56d', 
                                        padding:2,
                                       
                                        height:100, 
                                        borderRadius:5,
                                        borderWidth:1,}}>
                        <View style={{width: '100%',justifyContent:'center',alignSelf:'center'}}>
                            <Image style={{height:60,width:50,resizeMode: 'contain',alignSelf:'center'}} source={{uri:uri}}/>
                        </View> 
                        <View style={{alignItems:'center',justifyContent:'center',padding:1,margin:1,flexDirection:'row'}}>
                            <Text style={{fontSize:12,}}>{item.subcat_name}</Text>
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
    
        return(<View style={{width:'100%',flex:1,backgroundColor:'#2fd827'}}>
            
            <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
                     <ScrollView>                   
                         <FlatList
                        data={this.state.data}
                        renderItem={this._renderIteam}
                        keyExtractor={item =>item.gro_subcat_id.toString()}
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