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
import Connection from '../../Global/Connection/Connection';
import { ProductListing } from '../Cart/ListPrepare';
import { SearchBar } from 'react-native-elements'
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
        this.conn=new Connection();
        
    }

    // _onEndReached=()=>{
    //     console.log("Calling the end rich");
    //     if(this.state.isData)
    //    this._inslized();
    // }

    componentDidMount(){
       // console.log(this.state.sql);
       this.fetech();
      //  this._inslized();
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
              
            console.log("Product List Load.....",responseJson);
             this.setState({data:responseJson.data.data,fullData:responseJson.data.data}) 
          //  console.log("On shop  value :", value);
          }).catch((error) => {
                
              //  alert("updated slow network");
             console.log( error.message);
            // log.error({error:err})
              //   value.flag=false;
              //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
  
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
    //     let sName = item.sName.split(',')[0];
         let PID = item.gro_product_list_id;
    //     let sID = item.ShopID.split(',')[0];
    //     let unit =item.unit.split(',')[0];
    //     let price =item.price.split(',')[0];
    //   //  let Qun = "1"
    //     let pListID = item.p_list_id.split(',')[0];
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
                        <Text style={{fontSize:20,fontWeight:'300'}}>{pName}</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900',color:'#d2d5db'}}>{item.gro_product_info}</Text>
                    </View>
                    
                   <View>
                   <Text style={{fontSize:12,fontWeight:'300'}}>Item Id :{PID}</Text>
                   </View>

                    {/* <View>
                    <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>{sName}</Text>
                    </View>
                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                    <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                    </View> */}
                  </TouchableOpacity>
                   
                    {/* <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,height:100,paddingBottom:5}}>
                        <View style={{borderWidth:1}}>
                            <Picker
                                selectedValue={this.state.weight}
                                style={{  width: 100 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({language: weight})}>
                                <Picker.Item label="1 Kg" value="1" />
                             </Picker>
                        </View> 

                         {item.checked ?
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,height:100,paddingBottom:5}}>
                        <Button title=" Add Item + " onPress={this._toggleCheckbox.bind(this, item.index)}/>
                    </View>
                    :

                        <View style={{borderWidth:1,flexDirection:'row'}}>
                        <Button title=' - '  onPress={()=>{this.setState({Qun: this.state.Qun > 1? this.state.Qun-1 :this.state.Qun })}}/>
                        <TouchableOpacity onPress={()=>{ProductListing(PID,sID,this.state.Qun,unit,price,pListID,uri);}}>
                        <View style={{width:50}}><Text style={{fontSize:20,alignSelf:'center'}}>{this.state.Qun}</Text></View>
                        </TouchableOpacity>
                        <Button title=' + ' onPress={()=>{this.setState({Qun:this.state.Qun+1})}}/>
                           

                        </View>
                   }
                    </View>
                    */}
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