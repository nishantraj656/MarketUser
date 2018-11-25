import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator,createDrawerNavigator,DrawerItems,SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeMenu, Grocery } from '../Home/GroceryMenu';
import LogoTitle from '../LogoTitle/LogoTitle';
import BillList from '../Order/OrderList';
import MyProfile from '../CommanComp/MyProfile';
import Home from './Home';


class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color={tintColor} />
      ),
    };
  
    render() {
      return (
          <View style={{height:'100%'}}>
            <LogoTitle obj={this.props.navigation} />
            <Home obj={this.props.navigation}/>  
          </View>
        
      );
    }
  }


class GroceryScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Grocery',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color={tintColor} />
      ),
    };
  
    render() {
      return (
          <View style={{height:'100%'}}>
            <LogoTitle obj={this.props.navigation} />
             <Grocery/>
              
          </View>
        
      );
    }
  }
  
class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Notifications',
      drawerIcon: ({ tintColor }) => (
        <Icon name="bell" size={20} color={tintColor} />
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }

  class MyAccountScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'My Account',
      drawerIcon: ({ tintColor }) => (
        <Icon name="account" size={20} color={tintColor}/>
      ),
    };
  
    render() {
      return (
        <View style={{flex:1}}>
        <MyProfile/>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
        </View>
      );
    }
  }

  class HelpScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Help',
      drawerIcon: ({ tintColor }) => (
        <Icon name="help-circle" size={20} color={tintColor}/>
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }


  class SettingScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Setting',
      drawerIcon: ({ tintColor }) => (
        <Icon name="settings" size={20} color={tintColor}/>
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }

class MyOrderScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'My Order',
      drawerIcon: ({ tintColor }) => (
        <Icon name="mailbox" size={20} color={tintColor}/>
      ),
    };
  
    render() {
      return (
        <View style={{justifyContent:'flex-end',flex:1}}>
        <BillList/>
        </View>
      );
    }
  }

class AboutScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'About',
      drawerIcon: ({ tintColor }) => (
        <Icon name="alert-circle-outline" size={20} color={tintColor}/>
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }
  
  const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      
      <View style={{backgroundColor:'#660062',height:80}}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Home');props.navigation.toggleDrawer();}}>
        <View style={{flexDirection:'row',marginTop:50,paddingHorizontal:11}}>
        <Icon name="home" size={20} color="#ffffff"/>
        <View style={{paddingLeft:30}}>
          <Text style={{color:'#ffffff',fontWeight:'500'}}>Home</Text>
        </View>
          
        </View>
        </TouchableOpacity>
       
     </View>
      <SafeAreaView style={{ flex: 1,}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
  

  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });
  
 export const DrawerMenu = createDrawerNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    Grocery:{
      screen:GroceryScreen,
    },
    // Notifications: 
    //   screen: MyNotificationsScreen,
    // },
    MyAccount:{
        screen:MyAccountScreen,
    }, 
    MyOrder: {
        screen: MyOrderScreen,
      },
   
    // About: {
    //     screen: AboutScreen,
    //   },
    // Help:{
    //     screen:HelpScreen
    // },
    // Setting:{
    //     screen:SettingScreen
    // }
  },{
    initialRouteName:'Home',
    contentComponent:CustomDrawerContentComponent
  });