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
            ScrollView,
            Modal,
            TouchableHighlight,
            Alert,
            Picker
            
        } from 'react-native';


import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { ProductListing } from '../Cart/ListPrepare';
import { SearchBar } from 'react-native-elements';
import Search from '../../Global/Search';
import { TextInput } from 'react-native-gesture-handler';




export default class ProductsList extends React.Component
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
            Qun:1,
           weight:'0',
           start:0,
          loading:true,
          isData:true,
          imgPath:'http://gomarket.ourgts.com/public/',
          checkboxes:[],
            
        }
      
        
    }

    // _onEndReached=()=>{
    //     console.log("Calling the end rich");
    //     if(this.state.isData)
    //    this._inslized();
    // }

    componentDidMount(){
       // console.log(this.state.sql);
       this.fetech();
      //this._inslized();
    }

    fetech = async() =>{

        let value = await AsyncStorage.getItem('subID')
        if(value ==null){
            
           return; 
   
        }

    await  fetch('http://gomarket.ourgts.com/public/api/gro_product', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id:value
        })
        }).then((response) => response.json())
            .then((responseJson) => {
              
            console.log("Product List Load.....");
        this.setState({data:responseJson.data.data,isEmpty:"List is Empty...",fullData:responseJson.data.data,loading:false});
           
          }).catch((error) => {
                
              //  alert("updated slow network");
             console.log( error.message);
             this.setState({isEmpty:"Updated Slow Network",loading:false});
            }); 

    }

    _inslized=async()=>{ 
    
        this.setState({loading:true})
       let value =await this.conn.Query(this.state.sql+" Limit 10");
        if(value.flag){
        this.setState(state=>({data: state.data.concat(value.data)}));  
       // this.setState({data:value.data}); 
         this._addCheckbox();
         
        }
        this.setState({isEmpty:"List is empty..."});
        this.setState({loading:false})
        console.log("Get value is ",this.state.data);
        
    }

   

    _storeData=async(item) =>{
        try{
            await AsyncStorage.setItem('PID',JSON.stringify(item.gro_product_list_id));
            await AsyncStorage.setItem('Product',JSON.stringify(item));
            this.state.obj.navigate('productDetail',{
                id: item.gro_product_list_id,
                info:item.gro_product_info,
                name:item.gro_product_name,
                pic:this.state.imgPath+item.pic,
                unit:item.unit_name
              });
        }
        catch(error){
            console.log("Eroor he Product list me ",error);
        }
    }

    

    _addCheckbox() {

        let array =this.state.data;
      //  console.log(array);
      let index=0;
        array.forEach(element =>
        {  
            element["checked"]=true;
            element["index"]=index++;
            const {checkboxes} = this.state;
            
            checkboxes.push(
            
                element
            );
        
            this.setState({
                checkboxes
            });
        });
    }

    _toggleCheckbox =(index) =>{
        console.log("Index value ",index);
        const {checkboxes} = this.state;
    
       checkboxes[parseInt(index)].checked = !checkboxes[index].checked;
        
      //  console.log(checkboxes);
      

        this.setState({
            checkboxes
        });
        console.log(checkboxes);
    }
    
    
    
    _renderIteam=({item})=>{
            
       // console.log("Product ---",item );
     
        
        let pName = item.gro_product_name;
  
         let PID = item.gro_product_list_id;
   
    let uri;
    try {
      item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=this.state.imgPath+item.pic;  
    } catch (error) {
        uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
    }
       
        return(
            
                <View style={{ flex:1,
                                backgroundColor:'#fcfcfc', 
                                padding:5,
                                flexDirection:"row",
                                height:100, 
                                borderWidth:0.5,
                                borderColor:'#cecece'
                                }}>

                      
                     <View style={{padding:5,width:100, height: 100,borderRadius:5}}>
                   
                        <Image style={{width:100, height: 150,borderRadius:5,flex:1}} source={{uri:uri}}/>
                    </View>

                    <View style={{flex:1,paddingLeft:10}}>

                    <TouchableOpacity onPress={()=>{this._storeData(item)}}>
                  
                     <View style={{alignItems:'center', justifyContent:'center',padding:3,flexDirection:'row'}}>
                        <Text style={{fontSize:15,fontWeight:'300'}}>{pName}</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900',color:'#d2d5db'}}>{item.gro_product_info}</Text>
                    </View>
                    
                  </TouchableOpacity>
                    </View>
                </View>
            
            
                   
                        
        );
        
    } 
    
    

    
    _renderHeader=() =>{
        return <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
        
     }

     _onChangeText=(text) =>{
         try {
             console.log(text);
             let local = this.state.fullData;
             let temp =[];
             local.forEach(element => {
                if(element.gro_product_name.toUpperCase().search(text.toUpperCase()) != -1 || element.gro_product_info.toUpperCase().search(text.toUpperCase()) != -1  ){
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
        
        //this._retrieveData();
    // console.log("From state  ",this.state.data);
        return(
        <View style={{flex:1,width:'100%'}}>
            <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
           
            <ScrollView>  
                        <FlatList
                                data={this.state.data}
                                renderItem={this._renderIteam}
                                numColumns={1}
                                keyExtractor={item => item.gro_product_list_id.toString()}
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
                               
                               ListFooterComponent={()=>{if(this.state.loading) return <View style={{height:20}}><ActivityIndicator size="large" color="#0000ff" /></View>
                            else return <View></View>}}
                               
                                    
                        />   
        </ScrollView>      
        </View>
        )
    }
}