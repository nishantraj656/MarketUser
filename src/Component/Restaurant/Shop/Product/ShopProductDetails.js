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
            
            FlatList,
            ScrollView
        } from 'react-native';
import { PricingCard, Rating } from 'react-native-elements';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { CartPrepare } from '../../Cart/ListPrepare';


export default class ShopProductDetails extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.obj,
            pID:0,
            sID:0,
            data:[],
            selectedQunt:1,
            selectedShop:'not Selected',
            price:0,
            offer:0,
            topay:0,
            selectedProduct:0,
        }
        
    }

    fetech = async() =>{

        let value = await AsyncStorage.getItem('PID')
        let product = await AsyncStorage.getItem('Product')
        if(value ==null && product==null){
            
           return; 
   
        }
        product = JSON.parse(product);
        this.setState({selectedProduct:product});
        console.log("On shop  value :", this.state.selectedProduct);
        await  fetch('http://gomarket.ourgts.com/public/api/gro_product_shop', {
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
                
                // console.log("Related shop Load ......",responseJson);
            //  this.setState({data:responseJson.data.data}); 
             
            }).catch((error) => {
                    
                //  alert("updated slow network");
                console.log( error.message);
                // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 

    }

    componentWillMount(){
      //  this._retriveData();
    }

    componentDidMount(){
       // this._retriveData();
       this.fetech();
    }

    _selectShop= (item)=>{
      this.setState({selectedShop:item.name,price:item.gro_price,offer:item.offer,selectedProduct:item.gro_map_id})
       alert("Select");
       console.log(item);
    }
    

    _retriveData=async()=>{
        try{
            let pID = await AsyncStorage.getItem('PID');
            let sID = await AsyncStorage.getItem('ShopID');
            if(this.state.pID != pID && this.state.sID != sID){
                this.setState({pID:pID,sID:sID});
                this._inslized();
            }
        }
        catch(error){
            console.log(error)
        }
    }

    /**Render iteam for shop this._selectShop(item)*/
    _renderIteam =({item})=>{
        let uri;
        try {
          item.pic == null ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=item.pic;  
        } catch (error) {
            uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
        }
        return(
                
              <List>
                <ListItem avatar>
                <Left>
                <Thumbnail large source={{uri: uri}} />
                </Left>
                  <Body>
                  <TouchableOpacity onPress={()=>{this._selectShop(item);}}>
                    <View>
                        <Text>{item.name}</Text>
                        <Text note>Address : {item.address}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View>
                         <Text>Price <Icon name={'currency-inr'} size={15}/> {item.gro_price}</Text>
                        </View>
                        <View >
                         <Text style={{color:"#0b700a"}}>offer : {item.offer}% off</Text>
                        </View>
                        {/* <View>
                        <Text note>Ratting : {item.address}</Text>
                        </View> */}
                    </View>
                    </TouchableOpacity>
                  </Body>
                  
                </ListItem>
              </List>
              
            );
    }
/*** 
    _inslized=async()=>{ 
        let sql ="SELECT product_table.*,shop_info_table.*,product_list_table.* from product_table INNER JOIN shop_info_table on product_table.shop_id = shop_info_table.shop_info_id INNER JOIN product_list_table on product_list_table.p_list_id = product_table.p_list_id WHERE product_table.product_table_id ="+this.state.pID+" AND product_table.shop_id ="+this.state.sID;
        let value = await this.conn.Query(sql)
         if(value.flag){
             this.setState({data:value.data}); 
             console.log(this.state.data);   
         }
     }
*/
    render(){
     
        const { navigation } = this.state.obj;
         const itemId = navigation.getParam('id', 'NO-ID');
         const info = navigation.getParam('info', 'some default value');
         const name = navigation.getParam('name', 'some default value');
         const pic = navigation.getParam('pic', 'some default value');
         const unitname = navigation.getParam('unit','');
       // alert(pic);
       

         
       
     return(
        
     <View style={{flex:1,justifyContent:'space-between'}}>
         <ScrollView>
         <View style={{ 
                                        backgroundColor:'#fffcfc', 
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'
                                       
                                       
                                        }}>
             <View style={{ height:300,flexDirection:'row'}}>
            
             <View style={{paddingHorizontal:5,width: '100%', height:300,}}>
                 <Image style={{width: '100%', height: 300, resizeMode: 'contain',}} source={{uri:pic}}/> 
             </View>
             </View> 
             <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:18}}>{name}</Text>
             </View>

              <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:18}}>{itemId}</Text>
             </View>

             <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:12,fontWeight:'500',color:'#bbc0c9'}}>{info}</Text>
             </View>
           
         </View>
        
         <View style={{ backgroundColor:'#fffcfc', 
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View style={{flexDirection:'row'}}>          
                    <Text>Quntity :  </Text>
                    <Text style={{color:'#0b700a'}}>{this.state.selectedQunt} {unitname}</Text>
                    <View style={{paddingHorizontal:10}}></View>
                    <Button title="   -   " onPress={()=>{let qunt=this.state.selectedQunt-1; qunt>1?'':qunt=1; this.setState({selectedQunt:qunt})}}/>
                    <View style={{borderWidth:1,width:50,alignItems:'center'}}><Text>{this.state.selectedQunt}</Text></View>                        
                    <Button title="   +   " onPress={()=>{let qunt=this.state.selectedQunt+1;this.setState({selectedQunt:qunt})}}/>
               
                </View>
            
           
         </View>

          {/* <View style={{ backgroundColor:'#fffcfc', 
                                        marginTop:5,
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View>          
                    <Text style={{color:'#000cfc',alignSelf:'center',fontSize:15}}>Selected shop : {this.state.selectedShop} </Text>
                </View>
           <View style={{flexDirection:'row'}}>
               <Text>Price :{this.state.topay} </Text>
              <Text> {this.state.offer!=0?
                   <Text>{this.state.offer}</Text>
               :''}</Text>
 
           </View>
           
            
           
         </View> */}

         <View style={{ backgroundColor:'#fffcfc', 
                                        marginTop:5,
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View>          
                    <Text style={{color:'#000cfc',alignSelf:'center',fontSize:15}}>Related Product </Text>
                </View>
           <View style={{flexDirection:'row'}}>
               {/* <Text>Price :{this.state.topay} </Text>
              <Text> {this.state.offer!=0?<Text>{this.state.offer}</Text>:''}</Text> */}
             
              <FlatList
                    horizontal
                    data={this.state.data}
                    renderItem={this._renderIteam}
                   
                    keyExtractor={item => item.gro_shop_info_id.toString()}
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
 
           </View>  
         </View>

          {/* <View style={{ backgroundColor:'#fffcfc', 
                                        marginTop:5,
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View>          
                    <Text style={{color:'#000cfc',alignSelf:'center',fontSize:15}}>Related More Products </Text>
                </View>
           <View style={{flexDirection:'row'}}>
               <Text>Price :{this.state.topay} </Text>
              <Text> {this.state.offer!=0?<Text>{this.state.offer}</Text>:''}</Text>
 
           </View>
            
           
         </View> */}

         </ScrollView>
    
         <View style={{height:50,backgroundColor:'#ede32d',flexDirection:'row',justifyContent:'space-around'}}>
              
                        <View style={{padding:5}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{}}>Price :<Icon name={'currency-inr'} size={15}/> {this.state.selectedProduct.gro_price*this.state.selectedQunt} </Text>
                            {/* <Text style={{color:'#18ce21'}}>$ {this.state.topay}</Text> */}
                            </View>
                        </View>
                    <View style={{padding:5}}><Button title=" ADD TO BASKET " color="#ce2418" onPress={()=>{CartPrepare(this.state.selectedProduct,this.state.selectedQunt);}}/></View>
 
           
        </View>
     </View>
    
    
       )
    }
}