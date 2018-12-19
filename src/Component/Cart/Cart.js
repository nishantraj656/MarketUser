import React from 'react'
import { ToastAndroid,AsyncStorage,Text,ImageBackground,Image, View,Button,FlatList,ActivityIndicator,TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Connection from '../../Global/Connection/Connection';
import { CartRemoveItem } from './ListPrepare';
//import { listReturn } from './ListPrepare';

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
            selectedShopID:'',  // id of current selected shop  
            userID:'1', //user id   
            cartID:'0', //cart id   
            shopID:'1', //shopID
            process:false,  
            refreshing:false,
            isEmpty:"Wait List is Loading.....", //message to show while loading 
            cartItem:0, //No. of item in cart    
            offerAmt:10,
            priceTopay:0,
            imgPath:'http://gomarket.ourgts.com/public/',
            GrocerySelectedProduct:[], //Selected Grocery Product
            GroceryShop:[] //Selected Grocery Product
        }
       // this.conn =new Connection();
       
    }


    componentDidMount(){
       this._inslization();
       this.fetechShopList();
       this.fetchPrice();
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
                
               // console.log("Shop List Load ......",responseJson);
              this.setState({GroceryShop:responseJson.data.data}); 
            //  console.log("On shop  value :", value);
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
                
                console.log("PriceList Load......",responseJson);
              this.setState({avilableItem:responseJson.data});
           
            }).catch((error) => {
                    
                //  alert("updated slow network");
                console.log( error.message);
                // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
                }); 

    }

      // It will add the list to the cart with item number 
    _storeDataForCart = async () => {
        try {

         // await AsyncStorage.removeItem('List');
          
        let data =await AsyncStorage.getItem('List');

      
        const chooseValue = await AsyncStorage.getItem('chooseItem'); 
        
         let q = '#productID:'+chooseValue+",ShopID:"+this.state.data.shop_id+",Quntity:"+1+',Unit:'+this.state.data.unit+",Price:"+this.state.data.price;
        console.log(q);
        data =data+ q;

        const id = await AsyncStorage.getItem('ItemInCart');
        const l = parseInt(id,10)+1;
        await AsyncStorage.setItem('ItemInCart',l.toString());
      await AsyncStorage.setItem('List',data);
      // await AsyncStorage.mergeItem('List', JSON.stringify(UID123_del));

        console.log(":Items in cart  :"+await AsyncStorage.getItem('List'));
        ToastAndroid.show('Add to cart !', ToastAndroid.SHORT);

        console.log("List of data \n\n\n",data);
        
        } catch (error) {
        // Error saving data
        console.log("Error in store data beta ",error);
        }
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


    /** It will create query for database */
    DataCreater = async () => {

        let fullAray=[]
        let cart = await AsyncStorage.getItem('List');
        
        if(cart==null)
            return;

        let obj =JSON.parse(cart);
      
        await AsyncStorage.setItem("ItemInCart",obj.length.toString());
        
        await this.dublicateControl(obj);
         
          /** Preparing query*/   
          let arrayData= this.state.fullData; 
     
        // if(arrayData.length == 0){
        //     return;
        // }
   
           

            
        arrayData.forEach(function(element){
            
           
               
            if(quer2===null){
               
                 quer2 = 'product_table.p_list_id ='+element.PListID;       
            }
            else{
                
                quer2 = quer2 + ' OR product_table.p_list_id = '+element.PListID;
            }

           
                

            })
           
        
     
       
      await this.fireForSelectShop();
     
    }
    
    // Remove dublicate data
    dublicateControl = async(fullArray) =>{
                let freshArray=[];
                
             //   console.log('------------------------------------------------------------------------------------------------------------------------------------');
                console.log("In dublicasi ",fullArray);
                fullArray.forEach(function(element){
                  //  console.log("element 1 >>> ",element);
                    let flag=0;
                    freshArray.forEach(function(element2){
                       // console.log("element 2",element2.productID);
                        if(element.PListID == element2.PListID){
                            flag=1;
                            element2.Quntity = (parseInt(element2.Quntity,10) + parseInt(element.Quntity,10)).toString();
                          //  console.log("Element quntity ",element2.Quntity);
                       }
                    });
                    if(flag == 0){
                        freshArray.push(element);
                    }

                });
             //   console.log("In dublicate fresh array ",freshArray);
                await this.setState({fullData:freshArray});

    }

    

        // 
    _inslization = async ()=>{
        try{
           
            let shopID=await AsyncStorage.getItem('ShopID');
            let CartList = await AsyncStorage.getItem('CartList');
            CartList = JSON.parse(CartList);
           this.setState({GrocerySelectedProduct:CartList});
            /**  this.fireForCurrentShopOffer();
            this.DataCreater();
            this.FireForRemaningShop();
            this.fireForCurrentShop();
            this.setState({isEmpty:'List is empty'})*/
           
        }catch(error){
            //error part
            this.setState({isEmpty:'Somthing wrong click on Re-fresh'})
            console.log("Error in add cart ",error);
            alert("Error")
            
        }    
    }


              //fire command for query in database for item value 
    fireForSelectShop =async () =>{
                    try{
                        let shopid = this.state.selectedShopID;
                    
                           let quer1 ='select product_table.*,product_list_table.pic_1,product_list_table.p_name,product_list_table.manufacture_id from product_table INNER join product_list_table on product_table.p_list_id = product_list_table.p_list_id  where ( '
                           
                           let quer3 = ') AND shop_id =' + shopid;
                         
                        console.log(quer1+quer2+quer3);
                      let value= await this.conn.Query(quer1+quer2+quer3);
                      if(value.flag){
                        this.setState({data:value.data}); 
                      //  console.log(this.state.data);  
                        this.calculate(); 
                    }
                      

                    }catch(error){

                    }
             
             }

              //fire command for query in database for current selected shop
    fireForCurrentShop =async () =>{
                
                let query = "SELECT shop_info_table.*,security_table.* FROM `shop_info_table` INNER JOIN security_table ON shop_info_table.user_id = security_table.user_id WHERE shop_info_table.shop_info_id = "+this.state.selectedShopID;
                console.log("Shop Query :",query);

                let value= await this.conn.Query(query);
                if(value.flag){
                  this.setState({datashop:value.data}); 
                //  console.log(this.state.data);  
                  this.render(); 
              }
       
               }

    
              //fire command for query in database for current selected shop offer
        fireForCurrentShopOffer =async () =>{
                
                let query = "Select * from offer_table where shop_id ="+this.state.selectedShopID+" AND `status` = 'true' ORDER BY created_at DESC LIMIT 1";
                console.log("Shop Query :",query);

                let value= await this.conn.Query(query);
                if(value.flag){
                 
              
                try {
                    this.setState({offerAmt:value.data[0].discount})
                } catch (error) {
                    this.setState({offerAmt:'0'})
                }  
                  this.render(); 
              }
       
        }

               //It will get remaning shop id value
    FireForRemaningShop =async () =>{
                    this.setState({refreshing:true});
                    let query = "select * from shop_info_table where shop_info_id != "+this.state.selectedShopID;
                    console.log("Shop Query :",query);
    
                    let value= await this.conn.Query(query);
                    if(value.flag){
                      this.setState({avilableShop:value.data}); 
                    //  console.log(this.state.data);  
                      this.render(); 
                  }          
                }
        // fire for CartID 
    firecartID =async (query) =>{
            
                this.setState({refreshing:true});
                console.log(query);  
                await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                }) 
                }).then((response) => response.json())
                    .then((responseJson) => {
                  //  console.log("On Cart Value "+ typeof responseJson[0].m);
                        this.setState({cartID:responseJson[0].m});
                        this.setState({refreshing:false});
                        
                        return responseJson[0].m;
                    
                    }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        this.setState({refreshing:false});
        
                    });           
            }  
            
            //fire insert query
    fireInsert =async (query) =>{

        let flag ='N';
                console.log(query);
                await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                }) 
                }).then((response) => response.json())
                    .then((responseJson) => {
                    
                    
                   // alert("Insert");
                   // console.log("In insert data ",responseJson[0]);
                   responseJson[0] =='Y' ? flag=1 :flag=0;

               }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        this.state({process:false});
                        
        
                    }); 
                    return(flag);            
            }  

            /** Remove item from list if required */
    _removeItem = async(item)=>{

       // console.log(" XXXXXXXXXXXXX ",item);
        try{

        
        let tempArray = [];

        this.state.fullData.forEach(function(element){
            if(element.PListID != item.PListID)
           {
              tempArray.push(element); 
              ToastAndroid.show('Item Remove !', ToastAndroid.SHORT);
              console.log(" PUSH ",element)
           }
           else{
               console.log("NOT PUSH ",element)
           }
        });
       // console.log(" ######### ",tempArray);
        await AsyncStorage.setItem('List',JSON.stringify(tempArray));
        
        this.refresh();
    }catch(error){
        console.log(error)
    }

    }
        
    
        //Selected item list 
    _renderIteam=({item})=>{
       // console.log(item);
       /** Output is
        * Object {
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
                    <ImageBackground style={{height:70,width:50,resizeMode: 'contain'}} source={{uri:uri}}>
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
         return(
                 
               
               <View style={ { backgroundColor:'#ffffff',borderBottomWidth:0.2,justifyContent:'space-between',flexDirection:'row'}}>
                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15}}> {item.Pname}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15}}> {item.Quntity}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                        <Text style={{fontSize:15}}>{item.Price}</Text>
                        </View>

                </View>   
                         
        );
    }

        //Related shop price 
      
    _renderShop=({item})=>{
                
        // console.log(item);
        /**
         *  Object {
                        "address": "ABCD",
                        "city": "Beeru",
                        "created_at": "2018-11-14 07:49:22",
                        "gro_shop_info_id": 1,
                        "location": "kfjdkl",
                        "name": "Beeru",
                        "rating": 4,
                        "state": "Bihar",
                        "updated_at": null,
                        "user_id": 1,
                    }
         */
        return(
            <TouchableHighlight onPress={()=>{AsyncStorage.setItem('ShopID',item.shop_info_id);this._inslization();}}>
            <View style={{padding:5,backgroundColor:"#ffffff"}}>
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{item.name}</Text>
                                        <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >{item.address}</Text>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*{item.rating}</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : {Math.random()} K</Text>
                                    
                                        </View> 
                          <Text style={{alignSelf:'center',color:'#6d6d6d'}}> To shop from this shop click Now</Text>
            </View>
            </TouchableHighlight>        
                        
        );
        
    } 

    //done thish will place order
    DoneButton= async()=>{

        this.setState({process:true});
    
    let userID = await AsyncStorage.getItem('costID');
    
    let shopID = this.state.selectedShopID;
    let cinsert = "INSERT INTO `cart_lot_table`(customer_info_id,offer_amt,paid_amt,total_price,shop_info_id) VALUES ("+userID+',0,0,'+this.state.priceTopay+','+shopID+');';
        // if(!this.fireInsert(cinsert)){
        //     return;
        // }
        if(!await this.fireInsert(cinsert)){
            
            alert("Order fail check internet connection and retry");
            this.setState({process:false})
             return;
         }
     await this.firecartID('SELECT MAX(cart_lot_no) as m from cart_lot_table where `customer_info_id`='+userID);
      let cartID =this.state.cartID;
      let fullQuery ='';

      

   //   console.log("Cart Id",this.state.avilableItem);
     await this.state.avilableItem.forEach(function(element){
       //  console.log(element,element.productID);
          let q1= " INSERT INTO `order_table`(`custumber_id`, `product_list_id`, `cart_lot_no_id`,`order_status`,`quantity`,oPrice) VALUES( "
        let q2 = userID+","+element.productID+","+cartID+",0,"+element.Quntity+","+element.Price+" ); ";
        fullQuery = fullQuery + q1+q2;
        });

       //console.log("Full query :"+fullQuery);
    
    if(!await this.fireInsert(fullQuery)){
        alert("Order fail check internet connection and retry");
        this.setState({process:false})
         return;
     }
     else{
        alert("Your order successfully sent to the shopkeeper collect it ……");
        await AsyncStorage.setItem('ItemInCart', '0');
        await AsyncStorage.setItem('List',"");
       
        this.refresh();
        this.setState({process:false}); 
        this.sendNotifactionTome("New Order","New order of total price : "+this.state.priceTopay +" From customer.",this.state.datashop[0].noti_token);
        this.setState({avilableItem:[],priceTopay:'0',sumvalue:'0'});
    }
    }

    //it will calculate the price of avilable product
    calculate = async()=>{
           // console.log("In calculate");
            let price = 0;
            let array = this.state.fullData;
            let array2 = this.state.data;
            let avilableArray =[];

            // console.log("Full array calcu ",array);
            // console.log("Array 2 data ",array2);

            array2.forEach(function(element){ 
             //   console.log('-------',element);
                array.forEach(function(element2){
               //    console.log('>>>>>>>',element2);
                if(element.p_list_id == element2.PListID){
                    let ele =element2;
                  //  console.log("In element 2 :", element.product_table_id);
                   price = price + element.price * element2.Quntity;
                   ele.Price = element.price * element2.Quntity;
                   ele["Pname"] = element.p_name;
                  
                   avilableArray.push(ele);
                }

                });
                 
              
             });
            // console.log("Total price of the product ",price);
            //  this.setState({sumvalue:price});
             let priceTopay = (price - ((this.state.offerAmt/100) * price)).toFixed(0);
             this.setState({avilableItem:avilableArray,sumvalue:price,priceTopay:priceTopay});
           //  console.log("/////--------------",this.state.avilableItem);
        }

    render(){
       
      return(<View style={{flex:1,backgroundColor:'#d8d8d8'}}>
                  
                    <ScrollView
                   
                     
                    >
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
                                        {/* <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{this.state.datashop !=null? this.state.datashop[0].name:"There is no data" }</Text>
                                        <Text style={{fontSize:15,padding:1,fontWeight:'400',textShadowColor:'#0815cc',color:'#adadad'}} >Address : {this.state.datashop !=null? this.state.datashop[0].address:"There is no data" }</Text>
                                        <Text style={{fontSize:15,padding:1,fontWeight:'400',textShadowColor:'#0815cc',color:'#adadad'}} >Mobile No. :{this.state.datashop !=null? this.state.datashop[0].phone_no:"There is no data" }</Text> */}
                                        
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*3.5</Text>
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
           {!this.state.process ?  <Button title="Done" color="#f7c927" onPress={()=>{this.DoneButton()}}/> : <ActivityIndicator size="large" color="#0000ff" />}

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

          // " accept": "application/json",
         //  " accept-encoding": "gzip, deflate",
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
       // alert('Notific send');
}


}