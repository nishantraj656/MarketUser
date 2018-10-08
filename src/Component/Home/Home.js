import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from '../Category/Category';
import { ModalNavigator } from '../Category/CategoryMenu';
import { ModalNavigatorShop } from '../Shop/ShopMenu';
import CartDetails from '../Cart/Cart';


class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',height:500, alignItems: 'center' }}>
        
         <Text>Hellojkhkhkhk </Text> 
        
      </View>
    );
  }
}

class ShoppingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class CartScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}


export const HomeMenu = createBottomTabNavigator(
    {
        Home:ModalNavigator,
        Shopping: ModalNavigatorShop,
      Cart: CartDetails,
    //  Profile:ProfileScreen,
    //  "Order History":HistoryScreen,
      
        },
        {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Shopping') {
                iconName = `shopping${focused ? '' : ''}`;
            } else if (routeName === 'Cart') {
                iconName = `cart${focused ? '' : ''}`;
            }else if(routeName === 'Profile'){
                iconName = `account-settings${focused?'':''}`;
            }else if(routeName == 'Order History'){
                iconName =`delete${focused?'':''}`;
            }else if(routeName == 'Home'){
                iconName =`home${focused?'':''}`;
            }
    
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} size={25} color={tintColor} />;
            },
            
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: '#ffffff',
            style:{backgroundColor: '#2714d1'},
        },
        
        animationEnabled: false,
        swipeEnabled: true,
        initialRouteName :'Home',
        },   
  );
