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
import ShopCategory from './category/ShopCategory';
import ProductsList from '../ProductDetails/ProductsList';

import ProductDetails from '../ProductDetails/ProductDetails';
import ShopList from './ShopList';
import ShopDetails from './ShopDetail';
import ShopSubCategory from './sub/ShopSubCategory';
import ShopsProductsList from './Product/ShopProductsList';
import ShopProductDetails from './Product/ShopProductDetails';

class CategoryScreen extends React.Component
{ 
    constructor(props){
        super(props)
        this.state={
            obj:this.props.navigation
        }
    }

   
    render(){
        return(<View style={{flex:1}}>
                <ShopCategory obj={this.state.obj} />
                </View>)
        
       
    }
}

class ProductListScreen extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            obj:this.props.navigation
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                
                    <ShopsProductsList obj={this.state.obj}/>

                
                
            </View>
            
        );
    }
}

class SubCategoryScreen extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.navigation
        }
    }

    render(){
       
       
        return(

            <View style={{flex:1}}>
               
                    <ShopSubCategory obj={this.state.obj} />

                
                
            </View>
            
        );
      
    }
}

class ProductDetailsScreen extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                
                    <ShopProductDetails obj={this.state.obj}/>

                
                
            </View>
            
        );
    }
}

class ShopDetailsScreen extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.navigation
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <ShopDetails obj={this.state.obj}/>

                </ScrollView>
                
            </View>
            
        );
    }
}

class ShopListScreen extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            obj:this.props.navigation
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                
                    <ShopList obj={this.state.obj}/>

                
                
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