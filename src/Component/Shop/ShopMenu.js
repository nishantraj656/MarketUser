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
import Category from '../Category/Category';
import ProductsList from '../ProductDetails/ProductsList';
import SubCategory from '../SubCategory/SubCategory';
import ProductDetails from '../ProductDetails/ProductDetails';
import ShopList from './ShopList';
import ShopDetails from './ShopDetail';

class CategoryScreen extends React.Component
{ 
    constructor(props){
        super(props);
        this.state={
            categorySQL:null,
            ProductListSQL:null
        }
    }

    componentWillMount(){
        this._inslized();
    }

    _inslized =async() =>{
        try {
           let v = await AsyncStorage.getItem('ShopID');
           if(v!=null){
            let categorySQL = 'SELECT DISTINCT category_table.* FROM `category_table` INNER JOIN sub_category_table ON sub_category_table.category_id = category_table.category_id INNER JOIN product_list_table ON product_list_table.sub_category_id = sub_category_table.subcategory_id INNER JOIN product_table ON product_table.p_list_id = product_list_table.p_list_id WHERE product_table.shop_id = '+v;
            let ProductListSQL ="select min(product_table.price) as price ,GROUP_CONCAT(product_table.unit) as unit,product_table.p_list_id,GROUP_CONCAT(product_table.product_table_id) as productID,GROUP_CONCAT(product_table.shop_id) AS ShopID,GROUP_CONCAT(product_list_table.p_name) AS pName,GROUP_CONCAT(shop_info_table.name)  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.shop_info_id  = product_table.shop_id  GROUP BY p_list_id"
            this.setState({categorySQL:categorySQL,ProductListSQL:ProductListSQL})
           }
        } catch (error) {
            console.log("Error he re shopMenu me",error)
        }

       
    }
   
    render(){

       
        if(this.state.categorySQL!= null && this.state.ProductListSQL != null)
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{height:120}}>
                     <Category obj={this.props.navigation} sql={this.state.categorySQL}/>
                    </View>
                    <ProductsList obj={this.props.navigation} sql={this.state.ProductListSQL}/>
                </ScrollView>
              
            </View>
            
        );
        else
        return(<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size="large" color="#0000ff" />
        </View>);
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

       let value = await AsyncStorage.getItem('subID')
       let shop = await AsyncStorage.getItem('ShopID')
        if(value !=null && shop != null){
            
            console.log(this.state.subID);  
            let sql ="select product_table.price as price ,product_table.unit as unit,product_table.p_list_id,product_table.product_table_id as productID,product_table.shop_id AS ShopID,product_list_table.p_name AS pName,shop_info_table.name  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.shop_info_id  = product_table.shop_id where product_list_table.sub_category_id = "+value+" AND product_table.shop_id= "+shop;
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
            sql:null,
        }
    }

    componentWillMount(){
       
        this._inslized();
    }

    _inslized=async()=>{ 

       let value = await AsyncStorage.getItem('categoryID');
       let shop = await AsyncStorage.getItem('ShopID');
      
        if(value !=null && shop !=null){
            
            console.log(this.state.categoryID);  
            let sql ="SELECT DISTINCT sub_category_table.* FROM `category_table` INNER JOIN sub_category_table ON sub_category_table.category_id = category_table.category_id INNER JOIN product_list_table ON product_list_table.sub_category_id = sub_category_table.subcategory_id INNER JOIN product_table ON product_table.p_list_id = product_list_table.p_list_id WHERE product_table.shop_id = "+shop +" AND sub_category_table.category_id = "+value;
            this.setState({categoryID:value,sql:sql}); 
   
        }
    }

    render(){
       
        if(this.state.sql != null)
        return(

            <View style={{flex:1}}>
               
                    <SubCategory obj={this.props.navigation} sql={this.state.sql}/>

                
                
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

class ShopDetailsScreen extends React.Component
{
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <ShopDetails obj={this.props.navigation}/>

                </ScrollView>
                
            </View>
            
        );
    }
}

class ShopListScreen extends React.Component
{
    render(){
        return(
            <View style={{flex:1}}>
                
                    <ShopList obj={this.props.navigation}/>

                
                
            </View>
            
        );
    }
}

export const ModalNavigatorShop = createStackNavigator(
    {
    ShopList:{
            screen: ShopListScreen ,
                navigationOptions: () => ({
                    title:'Select Shop',
                    headerStyle:{height:30}
                }),

        },
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
    ShopDetail :{screen:ShopDetailsScreen,
    navigationOptions: () => ({
                            
        headerStyle:{height:30}
    }),
    },
    }
   
  );