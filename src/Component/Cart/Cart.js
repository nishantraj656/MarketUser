import React from 'react'
import { ToastAndroid,AsyncStorage,Text,ImageBackground,Image, View,Button,FlatList,ActivityIndicator,TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { CartRemoveItem } from './ListPrepare';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Header, Content, Item, Input, Title} from 'native-base';

// import Login from '../Login';
// import { listReturn } from './ListPrepare';

const quer2=null;

export default class CartDetails extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            data:[],  //keep shop id,price,productID fetech from server
            avilableItem:[], //it keep all the item data of selected shop 
            language:'',
            datashop:[], //
            sumvalue:'0', //total price of selected shop
            fullData:[], // all data of cart with complete data
            avilableShop:[],    // list of all shop 
            selectedShop:{},/** {
                                "address": "ABCD",
                                "city": "Beeru",
                                "created_at": "2018-11-14 07:49:22",
                                "gro_shop_info_id": 1,
                                "location": "kfjdkl",
                                "name": "Beeru",
                                "rating": 4,
                                "state": "Bihar", 
                                "user_id": 1
                            } */
            userID:'1', //user id   
            cartID:'0', //cart id   
            shopID:'1', //shopID
            islogin:2,  
            refreshing:false,
            isEmpty:"Wait List is Loading.....", //message to show while loading 
            cartItem:0, //No. of item in cart    
            offerAmt:10,
            priceTopay:0,
            obj:this.props.obj, 
            imgPath:'http://gomarket.ourgts.com/public/',
            GrocerySelectedProduct:[], //Selected Grocery Product
            GroceryShop:[], //Selected Grocery Product
            groceryArrayItem:[],//selectedArray
           token:'',
           profile:{},
           OrderAddress:{
               houseNo:23,
               pincode:889345,
               city:'Bhagalpur',
               state:'Bihar',
               name:'',
               mobileno:'+91 9939224274'
           }
        }

    }


    componentDidMount(){

       this._inslization();
       this.fetechShopList();
       
    }

    /** Shop List  */
    fetechShopList = async() =>{

       
        
        await  fetch('http://gomarket.ourgts.com/public/api/Grocery/Shop/List', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
           
            }).then((response) => response.json())
                .then((responseJson) => {
                
         this.setState({GroceryShop:responseJson.data.data,isEmpty:"List is empty..."}); 
              console.log("On shop  value :", responseJson);
            }).catch((error) => {
                    
                //  alert("updated slow network");
                console.log( error.message);
                // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 

    }

     /** fetch price  */
     fetchPrice = async() =>{

        let value = await AsyncStorage.getItem('ShopID')
        
        if(value ==null ){
            
           return; 
   
        }
      
      //  console.log("Pass value for price ",this.state.GrocerySelectedProduct)
        
        await  fetch('http://gomarket.ourgts.com/public/api/Grocery/Shop/product/price', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id:this.state.GrocerySelectedProduct,
                Shopid:JSON.parse(value)
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                
                //console.log("PriceList Load......",responseJson);
              this.setState({avilableItem:responseJson.data,isEmpty:"List is empty..."});
              this.setState({priceTopay:responseJson.price})
              
           
            }).catch((error) => {
                    
                //  alert("updated slow network");
                console.log("Erro during Price fetech", error.message);
                // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 

    }

                /** call for order */
    prepareOrder = async()=>{

        /**Object {
   "0": Object {
     "address": "Your Address",
     "city": "Bhagalpur",
     "cname": "Your Name",
     "cpin": 812001,
     "customer_info_id": 2,
     "location": "location",
     "pic": "",
     "state": "Bihar",
     "user_id": 63,
   },
   "address": "Your Address",
   "city": "Bhagalpur",
   "cname": "Your Name",
   "cpin": 812001,
   "customer_info_id": 2,
   "location": "location",
   "pic": "",
   "state": "Bihar",
   "user_id": 63,
 } */


        

        let value = await AsyncStorage.getItem('ShopID');
        let shopData = await AsyncStorage.getItem('ShopIDatat');
        if(value ==null || shopData == null){
           return; 
        }
       
       // console.log("Uder Prepare :",JSON.parse(shopData).noti_token);
        
    
       for(var i =0;i<this.state.avilableItem.length;i++){
        var dumpArray = {
            "map_id":this.state.avilableItem[i].gro_map_id,
            "qua":this.state.avilableItem[i].Quantity,
            "real_Price":this.state.avilableItem[i].gro_price,
             "offer_price":this.state.avilableItem[i].offer,
             "gro_product_shop_id":this.state.avilableItem[i].gro_product_shop_id  
            };
            this.state.groceryArrayItem.push(dumpArray);
       }
       console.log("after Prepared Array :",this.state.groceryArrayItem.length);
      
        await  fetch('http://gomarket.ourgts.com/public/api/gro_order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.state.token,
            },
            body:JSON.stringify({
                real_Price:this.state.priceTopay,
                Offer_Price:this.state.offerAmt,
                paid_amt:(0),
                customerID:this.state.profile.customer_info_id,
                Order_address:"Name : "+this.state.OrderAddress.name+" ,Address :- "+this.state.OrderAddress.houseNo+" , "+
                        this.state.OrderAddress.city+" , "+this.state.OrderAddress.state +" , "+this.state.OrderAddress.pincode,
                gro_shop_ID:JSON.parse(value),
                Item:this.state.groceryArrayItem
                })
            }).then((response) => response.json())
                .then(async(responseJson) => {
                    alert("Order Placed");
                    await AsyncStorage.setItem('CartList',JSON.stringify([]));
                    this.sendNotifactionTome("New Order","There is new request from coustmer",JSON.parse(shopData).noti_token)
                    this.setState({islogin:2,avilableItem:[],groceryArrayItem:[]});
                    this._inslization();
                    //  alert("updated slow network");
                    // console.log("Erro during Price fetech", error.message);
           
            }).catch(async(error) => {
                
               
                 log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 


    }

        //It will refresh the 
    refresh =async()=>{
        try{
            ToastAndroid.show('Wait in process !', ToastAndroid.SHORT);

              await  this._inslization();
             
              
              ToastAndroid.show('Process is complete !', ToastAndroid.SHORT);

         
        }catch(error){
            console.log(error);
          //  ToastAndroid.show('Somthing going wrong !', ToastAndroid.SHORT);

        }
      this.render();
    }


    

        // 
    _inslization = async ()=>{
        try{
           
            let shopID=await AsyncStorage.getItem('ShopID');
            let CartList = await AsyncStorage.getItem('CartList');
    
            if(shopID == null && CartList == null )
                return;
            CartList = JSON.parse(CartList);
           this.setState({GrocerySelectedProduct:CartList});
           this.fetchPrice();
           
        }catch(error){
            //error part
            this.setState({isEmpty:'Somthing wrong click on Re-fresh'});
            console.log("Error in add cart ",error);
            alert("Error")
            
        }    
    }

        //Selected item list 
    _renderIteam=({item})=>{
       // console.log(item);
       /** Output is
        *       {
                    "Quantity": 3,
                    "gro_map_id": 56,
                    "gro_price": 100,
                    "gro_product_info": "Product data change ",
                    "gro_product_list_id": 43,
                    "gro_product_name": "Maggi Oats Noodles",
                    "pic": "all_product_pics/noodles_n_sauce/Maggi Oats Noodles.jpg",
                    "quantity": 300,
                }
        */
       let uri;
       try {
         item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=this.state.imgPath+item.pic;  
       } catch (error) {
           uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
       }
      // console.log(uri);
        return(
            <View style={{padding:0,height:70}}>
                
                 <View style={{height:70,width:80,padding:5}}>
                    <ImageBackground style={{height:70,width:50}} source={{uri:uri}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                        <TouchableHighlight onPress={()=>{CartRemoveItem(item);this._inslization()}}>
                           <Text style={{fontWeight:'900',fontSize:14,alignSelf:'center',color:'#ce0000'}}>X</Text>
                        </TouchableHighlight>
                        </View>
                        <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                            <Text style={{alignSelf:'center'}}>{item.Quantity}</Text>
                        </View>
                        </View>
                      </ImageBackground>
                       
                    </View>  
                
   
                
            </View>
                   
                        
        );
        
    } 

        //Render price details
    _renderPrice=({item})=>{
        /**
                {
                "Quantity": 2,
                "gro_map_id": 396,
                "gro_price": 25,
                "gro_product_info": "Product data change ",
                "gro_product_list_id": 361,
                "gro_product_name": "OBESITY",
                "gro_product_shop_id": 62,
                "gro_shop_info_id": 2,
                "offer": 0,
                "pic": "all_product_pics/patanjali/OBESITY.jpg",
                "price": 50,
                "quantity": 1,
                "unit_name": "g",
                }
      */
       
           
        return(

               <View style={ { backgroundColor:'#ffffff',borderBottomWidth:0.2,justifyContent:'space-between',flexDirection:'row'}}>
                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15}}> {item.gro_product_name}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15}}> {item.Quantity} {item.unit_name}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                        <Text style={{fontSize:15}}><Icon name={'currency-inr'} size={15}/> {item.price}</Text>
                        </View>

                </View>   
                         
        );
    }

    _storeSelectedShop = async(item)=>{
    await AsyncStorage.setItem('ShopID',JSON.stringify(item.gro_shop_info_id));
    await AsyncStorage.setItem('ShopIDatat',JSON.stringify(item));
    this.setState({selectedShop:item});
    console.log("Sellect Shop :",this.state.selectedShop);
    // this._inslization();
    }
        //Related shop price 
      
    _renderShop=({item})=>{
                
        /**
           {
         "DCharge": 0,
         "IsDelivery": 0,
         "Pin_Code": "812007",
         "address": "abcd",
         "city": "bhagalpur",
         "created_at": "2019-01-13 13:49:35",
         "gro_shop_info_id": 6,
         "location": "bnvf",
         "name": "thomos",
         "noti_token": "ExponentPushToken[SuD6cxCZBI452wJ37Qnl74]",
         "pic": "\"\"",
         "rating": 5,
         "state": "bihar",
         "updated_at": null,
         "user_id": 57,
         "visiblilty": 1,
       },
         */
        
        return(
            <TouchableHighlight onPress={()=>{this._storeSelectedShop(item);}}>
            <View style={{padding:5,backgroundColor:"#ffffff"}}>
                <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{item.name}</Text>
                <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >{item.address}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*{item.rating}</Text>
                <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : {Math.random()} K</Text>
                <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>{item.gro_shop_info_id}</Text>
                                    
            </View> 
                <Text style={{alignSelf:'center',color:'#6d6d6d'}}> To shop from this shop click Now</Text>
            </View>
            </TouchableHighlight>                               
        );
        
    } 

    //done thish will place order
    _DoneButton= async()=>{
        if(this.state.avilableItem.length==0){
            return;
        }
        this.setState({process:true});
    
    let Token = await AsyncStorage.getItem('Token');
    let UserID = await AsyncStorage.getItem('UserID');
    let profile = await AsyncStorage.getItem('userProfileData');
   // let app = await AsyncStorage.getItem('auth');

    console.log("Token : ",Token);
    console.log("UserID : ",UserID);
    if(Token == null || UserID == null || null == profile ){
        console.log("Under null")
       this.setState({islogin:0});
    }
    else{
       // console.log(JSON.parse(profile));
       profile = JSON.parse(profile);
        this.setState({islogin:1,token:Token,userID:UserID,profile:profile});
    }
    
    this.setState({process:false});
   
      
  }



    render(){
       if(this.state.islogin == 0){
        return  this.state.obj.navigate('Login');        
       }
       else if(this.state.islogin == 1)
            return(<View style={{flex:1,backgroundColor:'#d8d8d8'}}>
                  
                <ScrollView>
                    <View style={{backgroundColor:"#f9f9f9",padding:5,justifyContent:'center'}}>

                        <View style={{flex:0.5,backgroundColor:"#f9f9f9",marginBottom:5,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{height:150,width:150,padding:5}}>
                        <ImageBackground source={{uri: 'http://www.picaframehsv.com/wp-content/uploads/2014/08/banner.jpg'}} style={{height:"100%",width:"100%"}} />
                        </View>   
                        <View style={{height:150,width:150,padding:5}}>
                        <ImageBackground source={{uri: 'http://www.picaframehsv.com/wp-content/uploads/2014/08/banner.jpg'}} style={{height:"100%",width:"100%"}} />
                        </View> 
                        </View> 
                          <View style={{flex:1}}>
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{this.state.selectedShop.name }</Text>
                                        <Text style={{fontSize:15,padding:1,fontWeight:'400',textShadowColor:'#0815cc',color:'#adadad'}} >Address : {this.state.selectedShop.address }</Text>
                                      {/**  <Text style={{fontSize:15,padding:1,fontWeight:'400',textShadowColor:'#0815cc',color:'#adadad'}} >Mobile No. :{this.state.datashop !=null? this.state.datashop[0].phone_no:"There is no data" }</Text> */}
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*{this.state.selectedShop.rating}</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                                    
                            </View> 
                           
                        </View>   
                                                     
                    </View>
                  
               
                 <Container>
                        <Header>
                            <Title>Your Shipping Address</Title>
                        </Header>
                    <Content>
                   
                    <Item>
                        <Icon active name='home' size={20}/>
                        <Input 
                        onChangeText={(text) => {
                           
                            this.setState({OrderAddress:{pincode:text}})
                        }}
                        placeholderTextColor='#a8afa9'
                        textContentType='postalCode'
                        keyboardType='numeric'
                       
                        placeholder='Pin Code *'/>
                    </Item>

                    <Item>
                        <Icon active name='home' size={20}/>
                        <Input
                        onChangeText={(text) => {
                           
                            this.setState({OrderAddress:{houseNo:text}})
                        }}
                        placeholderTextColor='#a8afa9'
                         placeholder='House No.,Building name *'/>
                        
                    </Item>
                    <Item>
                        <Icon active name='home' size={20}/>
                        <Input 
                        onChangeText={(text) => {
                           
                            this.setState({OrderAddress:{city:text}})
                        }}
                        placeholderTextColor='#a8afa9'
                        textContentType='postalCode'
                        placeholder='City *'/>
                    </Item>

                    <Item>
                        <Icon active name='home' size={20}/>
                        <Input
                        onChangeText={(text) => {
                           
                            this.setState({OrderAddress:{state:text}})
                        }}
                        placeholderTextColor='#a8afa9'
                        textContentType='postalCode'
                        placeholder='State *'/>
                        
                    </Item>
                    <Item>
                        <Icon active name='home' size={20}/>
                        <Input
                          onChangeText={(text) => {
                           
                            this.setState({OrderAddress:{name:text}})
                        }}
                        placeholderTextColor='#a8afa9'
                         placeholder='Name *'/>
                        
                    </Item>
                    <Item>
                        <Icon active name='home' size={20}/>
                        <Input 
                          onChangeText={(text) => {
                           
                            this.setState({OrderAddress:{mobileno:text}})
                        }}
                        placeholderTextColor='#a8afa9'
                        keyboardType='numeric'
                        placeholder='Mobile No. *'/>
                        
                    </Item>
                    <View>
                        <Button title="Save"    onPress={()=>{this.prepareOrder();}}/>
                    </View>
                    </Content>
                    
                </Container>

                
                   
              
                
            </ScrollView>      
       
        </View>
          );           
    else if(this.state.islogin == 2)        
      return(<View style={{flex:1,backgroundColor:'#d8d8d8'}}>
                  
            <ScrollView>
                    <View style={{backgroundColor:"#f9f9f9",padding:5,justifyContent:'center'}}>

                        <View style={{flex:0.5,backgroundColor:"#f9f9f9",marginBottom:5,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{height:150,width:150,padding:5}}>
                        <ImageBackground source={{uri: 'http://www.picaframehsv.com/wp-content/uploads/2014/08/banner.jpg'}} style={{height:"100%",width:"100%"}} />
                        </View>   
                        <View style={{height:150,width:150,padding:5}}>
                        <ImageBackground source={{uri: 'http://www.picaframehsv.com/wp-content/uploads/2014/08/banner.jpg'}} style={{height:"100%",width:"100%"}} />
                        </View> 
                        </View> 
                          <View style={{flex:1}}>
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{this.state.selectedShop.name }</Text>
                                        <Text style={{fontSize:15,padding:1,fontWeight:'400',textShadowColor:'#0815cc',color:'#adadad'}} >Address : {this.state.selectedShop.address }</Text>
                                      {/**  <Text style={{fontSize:15,padding:1,fontWeight:'400',textShadowColor:'#0815cc',color:'#adadad'}} >Mobile No. :{this.state.datashop !=null? this.state.datashop[0].phone_no:"There is no data" }</Text> */}
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*{this.state.selectedShop.rating}</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                                    
                            </View> 
                           
                        </View>   
                                                     
                    </View>
                  

         <View style={{backgroundColor:'#ffffff',padding:10,marginTop:5}}>
                <View style={{width:'100%',marginTop:10,borderRadius:10,alignSelf:'center',backgroundColor:'#3569ad'}}>
                {/* <Text style={{fontSize:15,padding:5,fontWeight:'500',alignSelf:'center',textShadowColor:'#0815cc',color:'#f9f9f9'}} >{this.state.datashop !=null? this.state.datashop[0].name:"There is no data" } Basket </Text> */}
                           
                </View>

                <Text>Available Item Into the cart</Text>
            
            

                <FlatList
                                data={this.state.GrocerySelectedProduct}
                                renderItem={this._renderIteam}
                                ListFooterComponent={this._renderFoot}
                                keyExtractor = {(item)=>{item.productID}}
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

                                horizontal={true}
                            />   



         </View>


         
         <View style={{backgroundColor:'#ffffff',marginTop:5}}>
                

                 <View style={{width:'100%',marginTop:10,borderColor:'#3f3f3f', borderWidth:0.5 ,alignSelf:'center',backgroundColor:'#ffffff'}}>
                <Text style={{fontSize:15,padding:5,fontWeight:'500',alignSelf:'center',textShadowColor:'#0815cc',color:'#000000'}} > PRICE DETAILS </Text>
                           
                </View>

                <View style={{}}>
                            <Text style={{fontSize:15,padding:5,fontWeight:'500',alignSelf:'center',textShadowColor:'#0815cc',color:'#01701c'}} > {this.state.offerAmt != '0' ? this.state.offerAmt+' % off on every sell':''}</Text>
                           
                            <View style={{flexDirection:'row'}}>
                               
                                <Text style={{fontSize:15,padding:1,fontWeight:'500',alignSelf:'center',textShadowColor:'#0815cc',color:'#020202'}} >Total : {this.state.priceTopay} Rs</Text>
                           
                                <Text style={{fontSize:10,padding:1,textDecorationLine:'line-through',alignSelf:'center',textShadowColor:'#0815cc',color:'#ba0505'}} > {this.state.offerAmt != '0' ? this.state.sumvalue+' Rs ':''}</Text>
                           
                                <Text style={{fontSize:12,padding:1,alignSelf:'center',textShadowColor:'#0815cc',color:'#01701c'}} > {this.state.offerAmt != '0' ? (this.state.sumvalue - this.state.priceTopay)+' Rs saved':''}</Text>
                           
                                
                            
                            </View>
                                      
                </View>
                <Text>Available Item In the selected Shop</Text>
            
                <View style={{backgroundColor:'#06024f',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
                    <View style={{alignItems:'center',padding:3,width:'25%',margin:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}> Name</Text>
                    </View>
                   
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                     <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Quantity</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',paddingRight:5,margin:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Price</Text>
                    </View>
                </View>
                <FlatList
                                data={this.state.avilableItem}
                                renderItem={this._renderPrice}
                                ListFooterComponent={this._renderFoot}
                                keyExtractor = {(item)=>{item.productID}}
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
                
                <View style={{backgroundColor:'#ffffff',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
                    <View style={{alignItems:'center',padding:3,margin:5,}} >
                    <Text style={{fontSize:15,color:'#06024f'}}> Shepping Charge</Text>
                    </View>
                   
                   
                    <View style={{alignItems:'center',justifyContent:'space-between',paddingRight:5,margin:5,}} >
                    <Text style={{fontSize:15,color:'#64ed49'}}>Free</Text>
                    </View>
                </View>

                <View style={{backgroundColor:'#64ed49',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
                    <View style={{alignItems:'center',padding:3,margin:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#06024f'}}> Ammount Payable</Text>
                    </View>
                   
                   
                    <View style={{alignItems:'center',justifyContent:'space-between',paddingRight:5,margin:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#06024f'}}>{this.state.priceTopay}</Text>
                    </View>
                </View>



         </View>

         <View style={{padding:10,backgroundColor:'#071a84',marginTop:10}}>
                    <Text style={{color:'#fcfcfc',fontStyle:'italic',fontSize:20,}}> Price of the same item on other shop.</Text>

                </View>

                <FlatList
                                data={this.state.GroceryShop}
                                renderItem={this._renderShop}
                                keyExtractor={item => item.shop_info_id}                           
                                
                                ListFooterComponent={this._renderFoot}
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

                                ItemSeparatorComponent={()=>{return(<View style={{backgroundColor:'#f56f43',height:0.5,marginBottom:2}}></View>)}}
                            />   
             
               
            </ScrollView>
           <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
           {!this.state.process ?  <Button title="Done" color="#f7c927" onPress={()=>{this._DoneButton()}}/> : <ActivityIndicator size="large" color="#0000ff" />}

            <Button title="Refresh" onPress={()=>{this._inslization() }}/>
               
           </View>
       
       
        </View>
          )       
    }

    

        //database connection 
  sendNotifactionTome = (title,msg,token) =>{
   
    // console.log("Tokn :",token);
    fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            
            "content-type": "application/json",
        },
        body:JSON.stringify( {
            to:token,
            sound: "default",
            body: msg,
            title:title,
            badge: 1,
          })
        })
        console.log("Notification send");
       
}


}