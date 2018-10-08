import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator,createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeMenu } from '../Home/Home';
import LogoTitle from '../LogoTitle/LogoTitle';
import BillList from '../Order/OrderList';
import MyProfile from '../CommanComp/MyProfile';


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
             <HomeMenu/>
              
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
    // Notifications: {
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
    initialRouteName:'Home'
  });