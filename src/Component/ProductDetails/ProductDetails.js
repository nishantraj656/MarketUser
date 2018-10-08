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
        }
        this.conn=new Connection();
    }

    componentWillMount(){
        this._retriveData();
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
        if(this.state.data.length){
         pName = this.state.data[0].p_name;
         price =this.state.data[0].price;
         desc = this.state.data[0].p_desc;
         Qun = '1';
         pListID ="2"
         unit =this.state.data[0].unit;
         sID=this.state.data[0].shop_id;
         pID=this.state.data[0].product_table_id;
       
     return(
     <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
    
         <View style={{ 
                                        backgroundColor:'#fffcfc', 
                                        padding:5,
                                       
                                       
                                       
                                        }}>
             <View style={{ height:200,flexDirection:'row'}}>
             <View style={{paddingHorizontal:5,width: '100%', height: 200,}}>
                 <Image style={{width: '100%', height: 200,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/> 
             </View>
             <View style={{paddingHorizontal:5,width: '100%', height: 200,}}>
                 <Image style={{width: '100%', height: 200,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/> 
             </View>
             </View> 
             <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                 <Text style={{fontSize:20,fontWeight:'900'}}>{pName}</Text>
             </View>

             <View style={{justifyContent:'space-around',flexDirection:'row'}}>
             <Text style={{fontSize:15,fontWeight:'900'}}>Price:{price} Rs/kg</Text>
             
             </View>
             
            

             <View>
             <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}></Text>
             </View>
             <View style={{justifyContent:'space-around',flexDirection:'row'}}>
             <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
             <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
             </View>
         </View>
         <ScrollView>
         <View >
             <Text>{desc}</Text></View>
         </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
            <Button title="Add to cart" color="#f7c927" onPress={()=>{ProductListing(pID,sID,Qun,unit,price,pListID) }}/>
            <Button title="Cancel" color="#f7c927" onPress={()=>{this.state.obj.goBack(); }}/>
            
        </View>
    
    
     </View>
       )
    }
    else
        return(<View></View>)
    }
}