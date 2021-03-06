import React from 'react';
import {
            ActivityIndicator,
            AsyncStorage,
           
            StatusBar,
            StyleSheet,
            TouchableOpacity,
            Image,
            View,
           
            FlatList,
            ScrollView
        } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';




export default class RestaurantList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],//store data of category items
            process:false,
            obj:this.props.obj,
            serachText:"",
            fullData:'',
        }
        //this.conn = new Connection();
    }

    
    componentDidMount(){
       
        this.fetch();
    }

    fetch = async() =>{

       
        
        await  fetch('http://gomarket.ourgts.com/public/api/Restaurant/Shop/List', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
           
            }).then((response) => response.json())
                .then((responseJson) => {
                
                console.log("Resturen List Load ......",responseJson);
              this.setState({data:responseJson.data.data}); 
            //  console.log("On shop  value :", value);
            }).catch((error) => {
                    
                //  alert("updated slow network");
                console.log( error.message);
                // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 

    }


    _storeData=async(sID) =>{
        try{
         
            await AsyncStorage.setItem('ResShopID',JSON.stringify(sID))
            this.state.obj.navigate('Category');
        }
        catch(error){
            console.log("Eroor he Product list me ",error);
        }
    }


    _renderIteam=({item})=>{
        console.log("Resturent Load : ",item);  
        /** {
                 "DCharge": 0,
                "address": "",
                "city": "",
                "created_date": "2019-01-13 08:40:15",
                "isDelivry": 1,
                "name": "Beeru3",
                "pic": "",
                "pincode": null,
                "points": "",
                "res_info_id": 3,
                "state": "Bihar",
                "updated_at": "2019-01-13 09:32:25",
                "user_id": 69,
                "visiblilty": 1
            } */      
        let uri;
        try {
          item.pic == null ||item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=item.pic;  
        } catch (error) {
            uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
        }
        return(
                
              <List style={{backgroundColor:'#f9f9f9'}}>
                <ListItem avatar>
                <Left>
                <Thumbnail large source={{uri: uri}} />
                </Left>
                   <Body style={{backgroundColor:"#f9f9f9"}}>
                  <TouchableOpacity onPress={()=>{this._storeData(item.res_info_id);}}>
                    <View>
                        <Text>{item.name}</Text>
                        <Text note>Address : {item.address}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        
                         <View>
                        <Text note>Ratting : {Math.floor((Math.random() * 10000) + 1)}</Text>
                        </View> 
                    </View>
                    </TouchableOpacity>
                  </Body> 
                  <Right>
                      <View style={{backgroundColor:"#09c416",padding:10, justifyContent:'center'}}>
                       <Text style={{fontWeight:"900",color:'#ffffff'}}>{item.rating} *</Text> 
                      </View>
                  </Right>
                </ListItem>
              </List>
              
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
                if(element.name.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 ){
                    temp.push(element);
                    console.log(element)
                } else{ console.log(element)} 
             });
             this.setState({data:temp});
                      
             
         } catch (error) {
             console.log(error)
         }
     }

    
    render(){
    
        return(<View style={{width:'100%',flex:1,padding:10,}}>
                <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
                    <ScrollView
                    
                      
                    >                   
                         <FlatList
                            data={this.state.data}
                            renderItem={this._renderIteam}
                            keyExtractor={item => item.res_info_id.toString()}
                            ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>Wait List is Loading.....</Text>

                            </View>);}}  
                           
                            numColumns='1'
                            />

                        <View style={{paddingTop:10}}>
                          
                        </View>
                    </ScrollView>

                </View>);
    }
}