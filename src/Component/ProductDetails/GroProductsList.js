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
        
        this._inslized();
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

   

    _storeData=async(PID,sID) =>{
        try{
            await AsyncStorage.setItem('PID',PID);
            await AsyncStorage.setItem('ShopID',sID)
            this.state.obj.navigate('productDetail');
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
            
        console.log("Product ---",item );
     
        
        let pName = item.pName.split(',')[0];
        let sName = item.sName.split(',')[0];
        let PID = item.productID.split(',')[0];
        let sID = item.ShopID.split(',')[0];
        let unit =item.unit.split(',')[0];
        let price =item.price.split(',')[0];
      //  let Qun = "1"
        let pListID = item.p_list_id.split(',')[0];
        let uri =item.pic !=null ?item.pic.split(',')[0]:"http";
       
        return(
            
                <View style={{ flex:1,
                                backgroundColor:'#fcfcfc', 
                                padding:5,
                                flexDirection:"row",
                                height:150, 
                                borderWidth:0.5,
                                borderColor:'#cecece'
                                }}>

                      
                     <View style={{padding:5,width:100, height: 160,borderRadius:5}}>
                   
                        <Image style={{width:100, height: 150,borderRadius:5,flex:1}} source={{uri:uri}}/>
                    </View>

                    <View style={{flex:1,paddingLeft:10}}>

                    <TouchableOpacity onPress={()=>{this._storeData(PID,sID)}}>
                  
                     <View style={{alignItems:'center', justifyContent:'center',padding:3,flexDirection:'row'}}>
                        <Text style={{fontSize:20,fontWeight:'300'}}>{pName}</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900'}}>Price:{price} Rs/{unit}</Text>
                    </View>
                    
                   

                    <View>
                    <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>{sName}</Text>
                    </View>
                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                    <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                    </View>
                  </TouchableOpacity>
                   
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,height:100,paddingBottom:5}}>
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
                if(element.pName.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 || element.sName.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 || element.price.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 ){
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
                                data={this.state.checkboxes}
                                renderItem={this._renderIteam}
                                numColumns={1}
                                keyExtractor={item => item.p_list_id}
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