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
            checkboxes:[]

        }
       
    }
    
    
    
    

    componentDidMount(){
       
        this.fetech();
       
       // this._inslized();
    }

    fetech = () =>{
        
        fetch('http://gomarket.ourgts.com/public/api/gro_category', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
          }).then((response) => response.json())
              .then((responseJson) => {
                
           //  console.log(responseJson.data);
                console.log("Category Load .....")
              this.setState({data:responseJson.data.data}); 
             this. _addCheckbox();
              //console.log("On shop  value :",this.state.data);
            }).catch((error) => {
                  
                //  alert("updated slow network");
               console.log( error);
              // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
              }); 
  
      }

      
_addCheckbox() {

    let array =this.state.data;
  //  console.log(array);
  let index=0;
    array.forEach(element =>
    {  
        element["checked"]=true;
        element["index"]=index++;
        element["subData"]=[];
        element["flag"]=false;
        const {checkboxes} = this.state;
        
        checkboxes.push(
        
            element
        );
    this.state.checkboxes;
        this.setState({
            checkboxes
        });
    });
}

fetchSub = async(index) =>{

    const {checkboxes} = this.state;
    let value =checkboxes[parseInt(index)].gro_cat_id;

    if(checkboxes[index].flag){
        checkboxes[parseInt(index)].subData =[] ;
        this._toggleCheckbox(index);
        this.setState({
            checkboxes
        });  
        return;
    } 

    await  fetch('http://gomarket.ourgts.com/public/api/gro_subCategory', {
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
            
          console.log(responseJson);
          console.log("Subcategory Load....")
       checkboxes[parseInt(index)].subData=responseJson.data.data
       this.setState({
                checkboxes
            });  
        this._toggleCheckbox(index);
           //  console.log("On shop  value :", value);
        }).catch((error) => {
              
            //  alert("updated slow network");
           console.log( error.message);
          // log.error({error:err})
            //   value.flag=false;
            //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;

          }); 

  }

_toggleCheckbox = (index) =>{
    //console.log("Index value ",index);
     const {checkboxes} = this.state;

   checkboxes[parseInt(index)].flag = !checkboxes[index].flag;
    this.setState({
         checkboxes
    });
}

    _storeData=async(cID)=>{
        try{
            
            await AsyncStorage.setItem('categoryID',JSON.stringify(cID));
            this.fetchSub(index);
           // this.state.obj.navigate('SubCategory');
        }catch(error){
            console.log("Category ",error)
        }
    }

    /**store data of subcategory */
    _storeSubData=async(subID) =>{
        try{
            await AsyncStorage.setItem('subID',JSON.stringify(subID));
            this.state.obj.navigate('ProductList');
        }
        catch(error){
            console.log("Eroor he Product list me ",error);
        }
    }

    //List of category items
    _renderItems =({item})=>
    {
       console.log(item);
       let uri;
       try {
         item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=item.pic;  
       } catch (error) {
           uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
       }
          //  console.log("Value is ",item.category_id);
            return(
                <View>
                
                <View style={{height:50,backgroundColor:"#fcfdff",flexDirection:'row',justifyContent:'space-between'}}>
                     
                      <View style={{alignSelf:'center',height:40,width:50,paddingHorizontal:5,flexDirection:'row'}}>
                        <Image source={{uri:uri}} style={{height:40,width:50,alignSelf:'center'}}/>
                      </View> 
                      <View style={{paddingHorizontal:5 }}>
                         <Text style={{textAlign:'left'}}>{item.gro_cat_name}</Text> 
                      </View> 
                      <TouchableOpacity onPress={()=>{this._storeData(item.gro_cat_id);this.fetchSub(item.index);}}>  
                     <View style={{padding:5}}> 
                     <Icon name={item.flag ?"minus":"plus"} size={35}/>
                    </View> 
                    </TouchableOpacity> 
                </View>

                <FlatList
                                data={item.subData}
                                renderItem={this._renderSubIteam}
                                numColumns={1}
                                // keyExtractor={item => item.gro_product_list_id.toString()}
                               
                               
                               ListFooterComponent={()=>{if(this.state.loading) return <View style={{height:20}}><ActivityIndicator size="large" color="#0000ff" /></View>
                            else return <View></View>}}
                               
                                    
                        />   
                </View> 
               
               
            );
        }  

        _renderSubIteam =({item}) =>{

            /**
             *   {
                    "gro_subcat_id": 10,
                    "pic": "",
                    "subcat_name": "NOODLES & MORE",
                },
             */
            let uri;
            try {
              item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri=item.pic;  
            } catch (error) {
                uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
            }
            return(
                <View style={{height:50,backgroundColor:"#fcfdff",flexDirection:'row',justifyContent:'space-between'}}>
                     
                <View style={{alignSelf:'center',height:40,width:50,paddingHorizontal:5,flexDirection:'row'}}>
                  <Image source={{uri:uri}} style={{height:40,width:50,alignSelf:'center'}}/>
                </View> 
                <View style={{paddingHorizontal:5 }}>
                   <Text style={{textAlign:'left'}}>{item.subcat_name}</Text> 
                </View> 
                <TouchableOpacity onPress={()=>{this._storeSubData(item.gro_subcat_id);}}>  
               <View style={{padding:5}}> 
               <Icon name={"chevron-right"} size={35}/>
              </View> 
              </TouchableOpacity> 
          </View>
            )
        }
    render()
    {

        return(  
        <View style={{backgroundColor:'#e5ef73'}}>  
        <View style={{marginTop:3,backgroundColor:'#6d1e72'}}><Text style={{color:'#ffffff',fontWeight:'900',fontSize:20,marginHorizontal:5,padding:10}}>Shop By Category</Text></View>
                    
        <FlatList 
        data={this.state.checkboxes}
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
        keyExtractor={item =>item.gro_cat_id.toString()}
       
        />
        
        </View>);

    }
   
}