import React from 'react';

import {
            ActivityIndicator,
            AsyncStorage,
           
            StatusBar,
            StyleSheet,
            TouchableOpacity,
            Image,
            View,
            Text,
            FlatList,
        } from 'react-native';
import {Button,Content,Accordion} from 'native-base';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Connection from '../../Global/Connection/Connection';
import Search from '../../Global/Search';
import CategoryClass from '../../Grocery/CategoryClass';


/**This is use to show category  */
     

export default class Category extends React.Component 
{
    constructor(props){
        super(props);
        this.state={
            data:[],//store data of category items
            process:false,
            obj:this.props.obj,
            sql:this.props.sql,
            isEmpty:'Wait List is Loading.....',

        }
       
    }

    componentDidMount(){
       
        this.fetech();
       // this._inslized();
    }

    fetech = async() =>{

        await  fetch('http://gomarket.ourgts.com/public/api/gro_category', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
          }).then((response) => response.json())
              .then((responseJson) => {
                
              // console.log(responseJson.data);
               this.setState({data:responseJson.data.data}); 
              //console.log("On shop  value :",this.state.data);
            }).catch((error) => {
                  
                //  alert("updated slow network");
               console.log( error.message);
              // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
              }); 
  
      }

    _inslized=async()=>{ 

       let value = await this.conn.Query(this.state.sql)
        if(value.flag){
            this.setState({data:value.data});    
        }
        this.setState({isEmpty:"List is empty..."});
    }

    _storeData=async(cID)=>{
        try{
            
            await AsyncStorage.setItem('categoryID',JSON.stringify(cID));
            this.state.obj.navigate('SubCategory');
        }catch(error){
            console.log("Category ",error)
        }
    }

    //List of category items
    _renderItems =({item})=>
    {
        console.log(item);
        var yourBase64Icon = 'data:image/png;base64,'+item.category_pic;
          //  console.log("Value is ",item.category_id);
            return(
                
                <TouchableOpacity onPress={()=>{this._storeData(item.gro_cat_id);}}>  
                <View style={{height:50,backgroundColor:"#fcfdff",flexDirection:'row',justifyContent:'space-between'}}>
                     
                      <View style={{alignSelf:'center',paddingHorizontal:5,flexDirection:'row'}}>
                        <Image source={{uri:item.pic}} style={{height:40,width:50,alignSelf:'center'}}/>
                      </View> 
                      <View style={{paddingHorizontal:5 }}>
                         <Text style={{textAlign:'left'}}>{item.gro_cat_name}</Text> 
                      </View> 
                     <View style={{padding:5}}> 
                     <Icon name={"chevron-right"} size={35}/>
                    </View>  
                </View>
                </TouchableOpacity>
               
            );
        }  

    render()
    {

        return(  
        <View style={{backgroundColor:'#e5ef73'}}>  
        <View style={{marginTop:3,backgroundColor:'#6d1e72'}}><Text style={{color:'#ffffff',fontWeight:'900',fontSize:20,marginHorizontal:5,padding:10}}>Shop By Category</Text></View>
                    
        <FlatList 
        data={this.state.data}
        renderItem={this._renderItems}
        ItemSeparatorComponent={()=>{return(<View style={{borderRadius:5,borderWidth:0.5,borderBottomColor:'#757575'}}></View>)}}
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
        keyExtractor={item =>item.category_id}
       
        />
        
        </View>);

    }
   
}