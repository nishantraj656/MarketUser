import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { DrawerMenu } from './src/Component/Menu/Menu';
import Login from './src/Component/CommanComp/Login';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <Login obj={this.props.navigation}/>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super(); 
    this._bootstrapAsync();
    this._storeData();
  }

  _storeData = async () => {
    try {
  
    let value =  await AsyncStorage.getItem('CartList');
    if(value == null){
        
       await AsyncStorage.setItem('CartList', JSON.stringify([]));
      }
      // await AsyncStorage.setItem('List','')
    
    } catch (error) {
      // Error saving data
      console.log("Error in app,js store ",error);
    }
  }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
     //await AsyncStorage.setItem('key_login_status_market_g','false');
    const userToken = await AsyncStorage.getItem('key_login_status_market_g');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
   // this.props.navigation.navigate(userToken=='true' ? 'App' :'Auth');
 this.props.navigation.navigate('App');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerMenu,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
