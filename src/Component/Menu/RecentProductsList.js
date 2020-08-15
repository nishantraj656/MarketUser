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

//import { ProductListing } from '../Cart/ListPrepare';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class RecentProductsList extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            data:[],//store data of sub-category items
            process:false,
            obj:this.props.obj,
           
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
          userID:'',
          token:'',
          profile:'',

        }
        
        
    }



    componentDidMount(){
       // console.log(this.state.sql);
      
       this._retrieveData();
      //  this._inslized();
    }

    _retrieveData = async () => {
        try {
          let token = await AsyncStorage.getItem('Token');
          let userID = await AsyncStorage.getItem('UserID');
          let profile = await AsyncStorage.getItem('userProfileData');
            if ( userID == null || token == null ||profile == null) {

                // We have data!!         
                console.log("We have not any data ");
            }
            else{  
                profile = JSON.parse(profile);        
                this.setState({userID:userID,token:token,profile:profile})
                this.fetchOrder();
                console.log("Else wale ho beta ",profile);
            }
         } catch (error) {
           // Error retrieving data
           console.log("Error he re baba :: ",error);
         }
         
      }

        /** call for order */
    fetchOrder = async()=>{
       
        await  fetch('http://gomarket.ourgts.com/public/api/Recent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+this.state.token
            },
            body:JSON.stringify({
                userID:24//this.state.profile.customer_info_id
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    
                //    this.setState({data:responseJson.data});             
                    console.log("Load recent.........",responseJson);
                this.setState({data:responseJson.data,isEmpty:"List is empty...",loading:false}) 
                this._addCheckbox();
                   
            }).catch((error) => {
                
               
                 console.log("Error in fetech",error)
                
                }); 
                console.log("We have in  ");

    }

    fetech = async() =>{
        let value = await AsyncStorage.getItem('ShopID')
        let id = await AsyncStorage.getItem('subID')
        if(value ==null && id == null){
            
           return; 
   
        }

    await  fetch('http://gomarket.ourgts.com/public/api/Grocery/Shop/productList', {
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
              
            console.log("Product List Load.....");
             this.setState({data:responseJson.data.data,isEmpty:"List is empty...",loading:false}) 
             this._addCheckbox();
          // console.log("On shop  value :", this.state.checkboxes);
          }).catch((error) => {
                
              //  alert("updated slow network");
              this.setState({isEmpty:"Updated Slow Network",loading:false}) 
            
             console.log( error.message);
             log.error({error:err})
              //   value.flag=false;
              //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
  
            }); 

    }

    _inslized1 =async()=>{ 
    
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
/**Test code */
  

_addCheckbox() {

    let array =this.state.data;
  //  console.log(array);
  let index=0;
    array.forEach(element =>
    {  
        element["checked"]=true;
        element["index"]=index++;
        element["quntity"]=1;
        const {checkboxes} = this.state;
        
        checkboxes.push(
        
            element
        );
    
        this.setState({ 
            checkboxes
        });
        
    });
    this.setState({fullData:this.state.checkboxes})
}

_addQuantity=(index) =>{
    const {checkboxes} = this.state;

    checkboxes[parseInt(index)].quntity = checkboxes[index].quntity +1;
     
     console.log("Addd");
   
 
     this.setState({
         checkboxes
     });
     CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quntity);

}

 
_subQuantity=(index) =>{
    const {checkboxes} = this.state;
  
    checkboxes[parseInt(index)].quntity = checkboxes[index].quntity > 1? checkboxes[index].quntity-1 :checkboxes[index].quntity;
     
    console.log("sub");
   
 
     this.setState({
         checkboxes
     });
     CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quntity);
}

_toggleCheckbox =(index) =>{
    console.log("Index value ",index);
    const {checkboxes} = this.state;

   checkboxes[parseInt(index)].checked = !checkboxes[index].checked;
    
  //  console.log(checkboxes);
 // CartPrepare(this.state.selectedProduct,this.state.selectedQunt);

    this.setState({
        checkboxes
    });
    CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quntity);
   // console.log(checkboxes);
}



_renderIteam=({item})=>{
        
  //  console.log("Product ---",item );
  /** Object {
        "created_at": "2019-01-14 18:11:12",
        "gro_cart_id": 25,
        "gro_cat_id": 3,
        "gro_map_id": 3,
        "gro_order_id": 90,
        "gro_product_info": "Product data change ",
        "gro_product_list_id": 3,
        "gro_product_name": "Dabur Red Toothpaste",
        "gro_product_shop_id": null,
        "gro_quantity": 2,
        "offer_price": 0,
        "order_status": 0,
        "pic": "all_product_pics/personal_care/Dabur Red Toothpaste.jpg",
        "quantity": 750,
        "real_price": 99,
      },*/
 
    
    let pName = item.gro_product_name;
    let sName = item.gro_product_name;
    let PID = item.gro_product_list_id;
    let sID = 2;
   // let unit = item.unit_name;
   // let price = item.gro_price;
    let Qun = item.gro_quantity;
    let pListID =4;
    let uri;
    
    try {
      item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=this.state.imgPath+item.pic;  
    } catch (error) {
        uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
    }
  //  console.log(uri); {unit}
    return(
        
            <View style={{ flex:1,
                            backgroundColor:'#fcfcfc', 
                            padding:5,
                            width:150,
                            height:250, 
                            borderWidth:0.5,
                            borderColor:'#cecece',
                            borderRadius:1
                            }}>

                  
                 <View style={{padding:5,width:100, height: 160,borderRadius:5}}>
               
                    <Image style={{width:100, height: 150,borderRadius:5,resizeMode: 'contain',}} source={{uri:uri}}/>
                </View>

                <View style={{flex:1,paddingLeft:10}}>

                <TouchableOpacity onPress={()=>{this._storeData(item)}}>
              
                 <View style={{alignItems:'center', justifyContent:'center',padding:3}}>
                    <Text style={{fontSize:14,fontWeight:'300'}}>{pName} {PID}</Text>
                </View>

                {/**<View style={{justifyContent:'space-around',flexDirection:'row'}}>
                <Text style={{fontSize:14,fontWeight:'900'}}>Price: <Icon name={'currency-inr'} size={15}/> {price} </Text>
                </View> */}
            
               
              </TouchableOpacity>
               
            </View>
        </View>
        
               
                    
    );
    
} 


/**end */
   

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
            this.setState({checkboxes:temp});
                     
            
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
        
       if(this.state.checkboxes.length==0)
        return<View></View>
        else
        return(
        <View style={{flex:1,width:'100%',backgroundColor:'#5be524'}}>
           <Text style={{fontSize:20,fontWeight:"900",paddingTop:15}} >Frequently Buy Products  </Text>
           
         
                        <FlatList
                                data={this.state.checkboxes}
                                renderItem={this._renderIteam}
                                numColumns={1}
                                keyExtractor={item => item.index.toString()}
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
                            horizontal    
                                    
                        />   
      </View>
        )
    }
}