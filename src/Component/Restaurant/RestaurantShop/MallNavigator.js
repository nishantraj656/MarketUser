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
import RestaurantList from './RestaurantList';
import Category from '../Shop/category/ShopCategory';
/*import SubCategory from '../SubCategory/SubCategory';
import ProductsList from '../ProductDetails/ProductsList';
import ProductDetails from '../ProductDetails/ProductDetails';
import Slider from '../slider/Slider';
import MainCategory from '../../MainCategory/MainCategory';*/

class CategoryScreen extends React.Component 
{
   constructor(props){
       super(props)
       this.state={
           obj:this.props.navigation
       }
   }
    render(){
      //  alert("in category");
       return(
            <View style={{flex:1}}>
                <ScrollView>
                    <Category obj={this.state.obj} />
                </ScrollView>
              
            </View>
            
        );
    }
}

class ProductListScreen extends React.Component
{   
   
    constructor(props){
        super(props);
        this.state={
            subID:'0',
            sql:null,
        }
    }

    componentWillMount(){
       
        this._inslized();
    }

    _inslized=async()=>{ 

       let value = await AsyncStorage.getItem('subID');
       let v = await AsyncStorage.getItem('categoryID');
       
        if(value !=null && v !=null){
            
            console.log(this.state.subID);  
            let sql ="select min(product_table.price) as price,GROUP_CONCAT(product_list_table.pic_1) as pic,GROUP_CONCAT(product_table.unit) as unit,product_table.p_list_id,GROUP_CONCAT(product_table.product_table_id) as productID,GROUP_CONCAT(product_table.shop_id) AS ShopID,GROUP_CONCAT(product_list_table.p_name) AS pName,GROUP_CONCAT(shop_info_table.name)  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.shop_info_id  = product_table.shop_id INNER JOIN sub_category_table ON sub_category_table.subcategory_id = product_list_table.sub_category_id WHERE sub_category_table.category_id = "+v+" AND product_list_table.sub_category_id = "+value+" GROUP BY p_list_id";
            this.setState({categoryID:value,sql:sql}); 
   
        }
    }

   
    render(){
        if(this.state.sql != null)
        return(
            <View style={{flex:1}}>
               
               <Text> Category</Text>
              
            </View>
            
        );
       
    }
}

class MallListScreen extends React.Component
{ 
    constructor(props){
        super(props);
        this.state={
            categoryID:'0',
         
        }
    }

    componentWillMount(){
       
        this._inslized();
    }

    _inslized=async()=>{ 

       let value = await AsyncStorage.getItem('categoryID')
        if(value !=null){
            
            console.log(this.state.categoryID);  
          
            this.setState({categoryID:value,subCategorySQL:subCategorySQL,productListSQL:productListSQL}); 
   
        }
    }

    render(){

      
        return(
            <View style={{flex:1}}>
                <ScrollView>
                   <RestaurantList obj={this.state.props.navigation}/>
                </ScrollView> 
                
            </View>
            
        );
       
    }
} 

class ProductDetailsScreen extends React.Component
{
    render(){
        return( 
            <View style={{flex:1}}>
              
              <Text> Category</Text>
            </View>
            
        );
    }
}

export const MallNavigator = createStackNavigator(
    {
      
      MallList: { screen:MallListScreen ,
                        navigationOptions: () => ({
                            
                            headerStyle:{height:30},
                            title:'Select Sub-Category',
                            gestureDirection:'inverted',
                             }),
                    },
    Category: { screen: CategoryScreen,
        navigationOptions: () => ({
            header:null,
            
        }),
        },
      ProductList:{screen:ProductListScreen,
                    navigationOptions: () => ({
                                         
                        headerStyle:{height:30}
                    }),
    },
      productDetail :{screen:ProductDetailsScreen,
                        navigationOptions: () => ({
                                                
                            headerStyle:{height:30}
                        }),
    },
   
},{
    
}
   
  );