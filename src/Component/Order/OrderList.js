import React from 'react';
import { StyleSheet,Text, View,Button,TouchableOpacity,AsyncStorage, FlatList,ActivityIndicator } from 'react-native';
import {createStackNavigator} from 'react-navigation';


import { ScrollView } from 'react-native-gesture-handler';
import Feedback from '../Feedback/Feedback';




    //This  show List of History cart 
class CartList extends React.Component{
   
    constructor(props){
        super(props)
        this.state={
            data:[],
            id:this.props.id,
            datap:[],
            userID:0,
            process:false,
            isEmpty:'Wait List is Loading.....',
            token:'',
            price:0
        } 
      
    }

    componentDidMount(){
        console.log("It will call DidMount ");
        this._retrieveData();
        price =0;
     }

    _retrieveData = async () => {
        try {
          let token = await AsyncStorage.getItem('Token');
          let userID = await AsyncStorage.getItem('UserID');
            if ( userID == null && token == null) {

                // We have data!!         
                console.log("We have not any data ");
            }
            else{          
                this.setState({userID:userID,token:token})
                this.fetchOrder();
                //console.log("Else wale ho beta ");
            }
         } catch (error) {
           // Error retrieving data
           console.log("Error he re baba :: ",error);
         }
         
      }

      /** call for order */
    fetchOrder = async()=>{
       
        await  fetch('http://gomarket.ourgts.com/public/api/Grocery/Order/History', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.state.token
            },
            body:JSON.stringify({
                userID:this.state.userID
                })
            }).then((response) => response.json())
                .then(async(responseJson) => {
                    
                   this.setState({data:responseJson.data.data,isEmpty:"List is Empty....."});             
                    console.log("Load History.........",responseJson);
                    let pr=0
                    for(var j =0;responseJson.data.data.length >j;j++)
                    pr += responseJson.data.data[j].paid_amt
                    this.setState({price:pr});
            }).catch(async(error) => {
                
               
                 console.log(error)
                
                }); 


    }


      //store cartID 
      _storeData = async (select) => {
        try {
                console.log(select)
                await AsyncStorage.setItem('cartID',JSON.stringify(select));
                this.props.navigation.navigate("Details");
                console.log("in storage data ",select);

            } catch (error) {
                // Error saving data
                console.log("Error in store data beta ",error);
            }
      }


      
      _storeDataForProduct = async (select) => {
        try {
          await AsyncStorage.setItem('chooseItem', select);
          console.log("in storage data ",select);
          this.props.navigation.navigate('Details');
        } catch (error) {
          // Error saving data
          console.log("Error in store data beta ",error);
        }
      }

   
    _renderFoot =() =>{
                        return(
                                <View style={{paddingVertical:20,borderTopWidth:1,borderTopColor:'#CED0CE'}}>
                                    <ActivityIndicator animating size="large"/>
                                </View>
                            )
                    }

 
                 //Product list show data
_renderIteamList=({item})=>{

                  //  console.log(item);
                    /**
                       {
                            "created_at": "2019-01-14 18:29:26",
                            "customer_info_id": 63,
                            "feedback": "No Feedback",
                            "gro_cart_id": 26,
                            "gro_shop_info_id": 5,
                            "offer_amt": 10,
                            "paid_amt": 75,
                            "rating": 0,
                            "real_amt": 85,
                            "status": 0,
                        }
                     */
                    price +=item.paid_amt
                   var date = String(item.created_at).split(' ');
                    var days = String(date[0]).split('-');
                    // var hours = String(date[1]).split(':');
                   var ds = days[2]+"-"+days[1]+"-"+days[0];
            
                    return(
                        <View style={{shadowOpacity:5,shadowColor:"#050505"}}>
                        <TouchableOpacity onPress={()=>{ this._storeData(item.gro_cart_id);}}>
                            <View style={{  flex:1,
                                    backgroundColor:'#ffffff', 
                                    padding:5,
                                    width:"100%", 
                                    height:70, 
                                    borderRadius:5,
                                    borderWidth:1,
                                }}>
                                 
                                <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                                    <Text style={{fontSize:14,fontWeight:'900'}}>{ds}</Text>
                                </View>
            
                                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                                <Text style={{fontSize:12,fontWeight:'900'}}>Total Price : {item.real_amt} </Text>
                                <Text style={{color:'#21e004',fontSize:12,fontWeight:'900'}}>Paid Amount : {item.paid_amt}</Text>
                                </View>
                                
                               
            
                                {/* <View>
                                <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>Order On : {item.created_at}</Text>
                                </View>
                                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                                <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                                </View> */}
                            </View>
                        </TouchableOpacity>                      
                        </View>                                   
                    );
                    
                }  
        

    render(){
    
        return(
        // <View style={{width:'100%',flex:1,padding:2,}}>
        //             <ScrollView>                   
                        
                       
        //                     <FlatList
        //                         data={this.state.data} 
        //                         renderItem={this._renderIteamList}
        //                         numColumns={1} 
        //                        keyExtractor={item => item.cart_lot_no}
        //                         ListEmptyComponent={()=>{
        //                             if(this.state.isEmpty =='Wait List is Loading.....')
        //                              return(<View style={{justifyContent:'center'}}>
        //                                     <ActivityIndicator size="large" color="#0000ff" />
        //                                     <Text>{this.state.isEmpty}</Text>
    
        //                                 </View>);
        //                             else
        //                             return(<View style={{justifyContent:'center'}}>
        //                                     <Text>{this.state.isEmpty}</Text>
    
        //                                     </View>)}}
        //                             />   
                        
        //             </ScrollView>

        //             <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
        //              {!this.state.process ?  <Button title="Re-fresh" color="#f7c927" onPress={()=>{this.fire();}}/> : <ActivityIndicator size="large" color="#0000ff" />}              
        //             </View>
        //         </View>
        //      
         
        <View style={{backgroundColor:'#ffffff',marginTop:5}}>
           <View style={{backgroundColor:'#64ed49',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
           <View style={{alignItems:'center',padding:3,margin:5,}} >
                <Text style={{fontSize:15,fontWeight:'900',color:'#06024f'}}> Total Ammount Paid  : </Text>
           </View>
          
          
           <View style={{alignItems:'center',justifyContent:'space-between',paddingRight:5,margin:5,}} >
                <Text style={{fontSize:15,fontWeight:'900',color:'#06024f'}}>{this.state.price}</Text>
           </View>
       </View>      

        <View style={{width:'100%',marginTop:10,borderColor:'#3f3f3f', borderWidth:0.5 ,alignSelf:'center',backgroundColor:'#ffffff'}}>
            <Text style={{fontSize:15,padding:5,fontWeight:'500',alignSelf:'center',textShadowColor:'#0815cc',color:'#000000'}} > SHOPPING DETAILS </Text>            
       </View>
     
   
       <View style={{backgroundColor:'#06024f',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
          
           <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}> List</Text>
           
       </View>

       <FlatList
                       data={this.state.data}
                       renderItem={this._renderIteamList}
                       ListFooterComponent={this._renderFoot}
                       keyExtractor = {(item)=>{item.gro_cart_id}}
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
    </View>


        );
    }
} 

    // It Will show the details of cart Products
class CartDetails extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            data:[],
            isEmpty:'Wait List is Loading .......',
            cartID:'',
            token:'',
            price:''
        }
         
        this.feedback = new Feedback();    
    }
    
    refresh = async()=>{

        console.log("In refresh");
        this._start();

    }

    
    componentDidMount(){

        console.log("It will calll mount ");
        this._start();
        
    }

      //fire command for query in database
    fire = async() =>{
        await  fetch('http://gomarket.ourgts.com/public/api/Grocery/Order/History/Item', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.state.token
            },
            body:JSON.stringify({
                cartID:this.state.cartID
                })
            }).then((response) => response.json())
                .then(async(responseJson) => {
                    
                     this.setState({data:responseJson.data.data,isEmpty:"List is Empty....."});             
                    console.log("Load History.........",responseJson);
                    let pr=0
                    for(var j =0;responseJson.data.data.length >j;j++)
                    pr += responseJson.data.data[j].real_price
                    this.setState({price:pr});
            }).catch(async(error) => {
                
               
               //  log.error({error:err})
                
                });    
     }



    _start = async () => {

        let cart = await AsyncStorage.getItem('cartID');
        let token = await AsyncStorage.getItem('Token');
        if(cart == null && token == null){

            console.log("Cart ID is null.");
            return;
        }
        this.setState({cartID:JSON.parse(cart),token:token});
        await this.fire();
      }


      // It will add the list to the cart with item number 
      _storeDataForCart = async () => {
                try {
                const chooseValue = await AsyncStorage.getItem('chooseItem');
        
                const id = await AsyncStorage.getItem('ItemInCart');
                const l = parseInt(id,10)+1;
                await AsyncStorage.setItem('ItemInCart',l.toString());
                await AsyncStorage.setItem('List', chooseValue);
                console.log(":Items in cart  :"+await AsyncStorage.getItem('ItemInCart'));
                
                } catch (error) {
                // Error saving data
                console.log("Error in store data beta ",error);
                }
            }

            //Show the list of items
        _renderIteam=({item})=>{
          /**  Object {
                        "created_at": "2019-01-14 18:29:26",
                        "gro_cart_id": 26,
                        "gro_map_id": 2,
                        "gro_order_id": 91,
                        "gro_product_name": "Lifebuoy Nature Germ Protection Handwash",
                        "gro_product_shop_id": null,
                        "gro_quantity": 1,
                        "offer_price": 0,
                        "order_status": 0,
                        "real_price": 85,
                      },*/ 
                return(
                    <View style={item.order_status==0? { backgroundColor:'#e89b9b',borderBottomWidth:1,justifyContent:'space-between',flexDirection:'row'}
                                    :{ backgroundColor:'#a6e27a',borderBottomWidth:1,justifyContent:'space-between',flexDirection:'row'}}>
                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15,fontWeight:'900'}}> {item.gro_product_name}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15,fontWeight:'900'}}> {item.real_price-item.offer_price}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                        <Text style={{fontSize:15,fontWeight:'900'}}>{item.gro_quantity} {item.unit}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',paddingRight:5,}} >
                        <Text style={{fontSize:15,fontWeight:'900'}}> {(item.real_price - item.offer_price)*item.gro_quantity} </Text>
                        </View>
                    

                </View>   
                                
                );
                
            }  

    render(){
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        console.log("IUDjgfyukfguid",id);
        // this.fire(id);
        return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
       
            <View style={{
                            padding:5,
                            width:"100%", 
                            height:150, 
                            borderRadius:5,
                           
                            flex:1
                           }}>
                <View style={{backgroundColor:'#06024f',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
                    <View style={{alignItems:'center',padding:3,width:'25%',margin:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}> Name</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                     <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Unit</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                     <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Quantity</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',paddingRight:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Price</Text>
                    </View>
                </View>
                
                <FlatList
                    data={this.state.data} 
                    renderItem={this._renderIteam}
                    numColumns={1} 
                    keyExtractor={item => item.order_id} 
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


            

            </View>
            
            {this.feedback._interface()}
       
       
        </View>
          )
    }
}

const Rocket =createStackNavigator({
    Home:{screen:CartList, navigationOptions: () => ({
        title:'Bill History'  
    }),},
        Details:CartDetails,     
},{
    
});

export default class Order extends React.Component{
    
    render(){
        return(<View style={{flex:1}}><Rocket/></View> )
    }
}