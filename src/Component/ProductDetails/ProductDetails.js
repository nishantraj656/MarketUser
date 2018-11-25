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
import Connection from '../../Global/Connection/Connection';
import { ProductListing } from '../Cart/ListPrepare';

export default class ProductDetails extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.obj,
            pID:0,
            sID:0,
            data:[],
            selectedQunt:0,
            selectedShop:'not Selected',
            price:0,
            offer:0,
            topay:0
        }
        this.conn=new Connection();
    }

    componentWillMount(){
      //  this._retriveData();
    }

    componentDidMount(){
       // this._retriveData();
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

    _inslized=async()=>{ 
        let sql ="SELECT product_table.*,shop_info_table.*,product_list_table.* from product_table INNER JOIN shop_info_table on product_table.shop_id = shop_info_table.shop_info_id INNER JOIN product_list_table on product_list_table.p_list_id = product_table.p_list_id WHERE product_table.product_table_id ="+this.state.pID+" AND product_table.shop_id ="+this.state.sID;
        let value = await this.conn.Query(sql)
         if(value.flag){
             this.setState({data:value.data}); 
             console.log(this.state.data);   
         }
     }

    render(){
        let pName,price,shopName,unit,sID,pID,Qun,desc,pListID;
        const { navigation } = this.state.obj;
         const itemId = navigation.getParam('id', 'NO-ID');
         const info = navigation.getParam('info', 'some default value');
         const name = navigation.getParam('name', 'some default value');
         const pic = navigation.getParam('pic', 'some default value');
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
                 <Image style={{width: '100%', height: 300,}} source={{uri:pic}}/> 
             </View>
             </View> 
             <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:18}}>{name}</Text>
             </View>

             <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:12,fontWeight:'500',color:'#bbc0c9'}}>{info}</Text>
             </View>
           
         </View>
        
         <View style={{ backgroundColor:'#fffcfc', 
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View>          
                    <Text style={{color:'#000cfc',alignSelf:'center',fontSize:15}}>Quntity : {this.state.selectedQunt} </Text>
                </View>
           <View style={{flexDirection:'row'}}>
               
 
           </View>
            
           
         </View>

          <View style={{ backgroundColor:'#fffcfc', 
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
            
           
         </View>

         <View style={{ backgroundColor:'#fffcfc', 
                                        marginTop:5,
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View>          
                    <Text style={{color:'#000cfc',alignSelf:'center',fontSize:15}}>Related More Shop </Text>
                </View>
           <View style={{flexDirection:'row'}}>
               <Text>Price :{this.state.topay} </Text>
              <Text> {this.state.offer!=0?
                   <Text>{this.state.offer}</Text>
               :''}</Text>
 
           </View>
            
           
         </View>

          <View style={{ backgroundColor:'#fffcfc', 
                                        marginTop:5,
                                        padding:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'#b4b5b3'}}>
                <View>          
                    <Text style={{color:'#000cfc',alignSelf:'center',fontSize:15}}>Related More Products </Text>
                </View>
           <View style={{flexDirection:'row'}}>
               <Text>Price :{this.state.topay} </Text>
              <Text> {this.state.offer!=0?
                   <Text>{this.state.offer}</Text>
               :''}</Text>
 
           </View>
            
           
         </View>

         </ScrollView>
    
         <View style={{height:25,backgroundColor:'#ede32d'}}>

     </View>
     </View>
    
    
       )
    }
}