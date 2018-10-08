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
import Category from './Category';
import SubCategory from '../SubCategory/SubCategory';
import ProductsList from '../ProductDetails/ProductsList';
import ProductDetails from '../ProductDetails/ProductDetails';
import Slider from '../slider/Slider';

class CategoryScreen extends React.Component 
{
   
    render(){
      //  alert("in category");
      let categorySQL = 'SELECT category_id,category_name FROM `category_table`';
      let ProductListSQL ="select min(product_table.price) as price ,GROUP_CONCAT(product_table.unit) as unit,product_table.p_list_id,GROUP_CONCAT(product_table.product_table_id) as productID,GROUP_CONCAT(product_table.shop_id) AS ShopID,GROUP_CONCAT(product_list_table.p_name) AS pName,GROUP_CONCAT(shop_info_table.name)  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.shop_info_id  = product_table.shop_id  GROUP BY p_list_id LIMIT 10"
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{height:130}}>
                     <Category obj={this.props.navigation} sql={categorySQL}/>
                    </View>
                    <Slider/>
                    <ProductsList obj={this.props.navigation} sql={ProductListSQL}/>
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
            let sql ="select min(product_table.price) as price ,GROUP_CONCAT(product_table.unit) as unit,product_table.p_list_id,GROUP_CONCAT(product_table.product_table_id) as productID,GROUP_CONCAT(product_table.shop_id) AS ShopID,GROUP_CONCAT(product_list_table.p_name) AS pName,GROUP_CONCAT(shop_info_table.name)  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.shop_info_id  = product_table.shop_id INNER JOIN sub_category_table ON sub_category_table.subcategory_id = product_list_table.sub_category_id WHERE sub_category_table.category_id = "+v+" AND product_list_table.sub_category_id = "+value+" GROUP BY p_list_id";
            this.setState({categoryID:value,sql:sql}); 
   
        }
    }

   
    render(){
        if(this.state.sql != null)
        return(
            <View style={{flex:1}}>
               
                     <ProductsList obj={this.props.navigation} sql={this.state.sql}/>
                    
              
            </View>
            
        );
        else
        return(<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size="large" color="#0000ff" />
        </View>);
    }
}

class SubCategoryScreen extends React.Component
{ 
    constructor(props){
        super(props);
        this.state={
            categoryID:'0',
            subCategorySQL:null,
            productListSQL:null,
        }
    }

    componentWillMount(){
       
        this._inslized();
    }

    _inslized=async()=>{ 

       let value = await AsyncStorage.getItem('categoryID')
        if(value !=null){
            
            console.log(this.state.categoryID);  
            let subCategorySQL ="SELECT `subcategory_id`, `category_id`, `subcategory_name` FROM `sub_category_table` where category_id="+value;
           let productListSQL = "select min(product_table.price) as price ,GROUP_CONCAT(product_table.unit) as unit,product_table.p_list_id,GROUP_CONCAT(product_table.product_table_id) as productID,GROUP_CONCAT(product_table.shop_id) AS ShopID,GROUP_CONCAT(product_list_table.p_name) AS pName,GROUP_CONCAT(shop_info_table.name)  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.shop_info_id  = product_table.shop_id INNER JOIN sub_category_table ON sub_category_table.subcategory_id = product_list_table.sub_category_id WHERE sub_category_table.category_id = "+value+" GROUP BY p_list_id"
     
            this.setState({categoryID:value,subCategorySQL:subCategorySQL,productListSQL:productListSQL}); 
   
        }
    }

    render(){

        if(this.state.subCategorySQL != null && this.state.productListSQL != null)
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <SubCategory obj={this.props.navigation } sql={this.state.subCategorySQL}/>
                    <ProductsList obj={this.props.navigation} sql={this.state.productListSQL}/>
                  
                    </ScrollView> 
                
            </View>
            
        );
        else
        return(<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size="large" color="#0000ff" />
        </View>);
    }
}

class ProductDetailsScreen extends React.Component
{
    render(){
        return( 
            <View style={{flex:1}}>
              
                    <ProductDetails obj={this.props.navigation}/>
                
            </View>
            
        );
    }
}

export const ModalNavigator = createStackNavigator(
    {
      Category: { screen: CategoryScreen,
                    navigationOptions: () => ({
                        header:null,
                        
                    }),
                 },
      SubCategory: { screen: SubCategoryScreen ,
                        navigationOptions: () => ({
                            
                            headerStyle:{height:30}
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

}
   
  );