import React from 'react';
import {    StyleSheet, 
            Text, 
            View ,
            TouchableOpacity,
            Button,
            Image,
            TextInput,
            KeyboardAvoidingView,
            ActivityIndicator,
            ScrollView,
            AsyncStorage
        } from 'react-native';
import {createDrawerNavigator,createSwitchNavigator} from 'react-navigation';

import "../../pic/logo.png";
import IdentifyUser from './ForgetPassword/IdentifyUser';
import Register from './Register/Register';
import { registerForPushNotificationsAsync } from '../../Global/token';

const obj1=null;

class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           submitButtonDisable:false,
           email_or_phone:"",
           password:"",
           login_status:false,

        }
       
        
    }
    componentDidMount (){
     
        this._retrieveData();
       
    }
    _retrieveData = async () => {
        try {
         // await AsyncStorage.setItem('key_login_status_market_g', 'false');
        
         let token = await AsyncStorage.getItem('Token');
          const value = await AsyncStorage.getItem('key_login_status_market_g');
          if (value !== null ) {
              if(value == 'true'){
                this.setState({
                    login_status: true
                });
              }
            
          }
       
         } catch (error) {
             console.log('error in retrive data',error);
            this.setState({
                login_status: false
            });
         }
      }

    _storeData = async (user_email,user_phone,user_name,user_state,user_city,user_landmark,user_address,costID) => {
        try {
            
          await registerForPushNotificationsAsync(this.state.email_or_phone,this.state.password);
          await AsyncStorage.setItem('key_login_status_market_g', 'true'); 
          await AsyncStorage.setItem('user_email',user_email );
          await AsyncStorage.setItem('user_phone',user_phone );
          await AsyncStorage.setItem('user_name',user_name );
          await AsyncStorage.setItem('user_state',user_state);
          await AsyncStorage.setItem('user_city',user_city );
          await AsyncStorage.setItem('user_landmark',user_landmark );
          await AsyncStorage.setItem('user_address',user_address == null ? "  ":user_address);
          await AsyncStorage.setItem('costID',costID)
        
          this.props.navigation.navigate('MainMenu');

            console.log("saved");
        }catch (error) {
            console.log("Eroor in saving");
        }
    }

    submitLogin = () =>{
  
        if(this.state.email_or_phone.trim().length == 0 || this.state.password.length == 0 ){
            alert("Enter you email or password first")
            return;
        }
        
        this.setState({
            submitButtonDisable:true
        });
        let sql = 'SELECT user_id FROM `security_table` WHERE ((email = "'+this.state.email_or_phone+'" or phone_no = "'+this.state.email_or_phone+'" ) AND password = "'+this.state.password+'")';
        console.log(sql);
        fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: sql,
            }) 
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.length == 1){
                        let user_id = responseJson[0].user_id;
                        //alert("id "+user_id);
                        let sql = "SELECT customer_info_id,email,phone_no,cname ,state,city,landmark,address FROM security_table join customer_info_table on security_table.user_id = customer_info_table.user_id WHERE security_table.user_id = '"+user_id+"'";
                        console.log(sql);
                        fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: sql,
                            }) 
                            }).then((response) => response.json())
                                .then((responseJson) => {
                                    console.log(responseJson);
                                    if(responseJson.length != 0){
                                       
                                       registerForPushNotificationsAsync(this.state.email_or_phone,this.state.password);
                                       
                                        let data = responseJson[0];
                                        console.log("Value ",responseJson[0]);
                                        this._storeData(data.email,data.phone_no,data.cname,data.state,data.city,data.landmark,data.address,data.customer_info_id);
                                       // console.log(data.email,data.phone_no,data.cname,data.state,data.city,data.landmark,data.address);
                                                                            
                                    }
                                    else{
                                        alert("Login Again");
                                        this.setState({
                                            submitButtonDisable:false
                                        });
                                    }
                                        
                                    

                                }).catch((error) => {
                                    alert("Something Went wrong");
                                    console.log(error);
                                    this.setState({
                                        submitButtonDisable:false
                                    });
                                    

                                });

                                
                        
                    }
                    else{
                        alert("Invalid Password");
                        this.setState({
                            submitButtonDisable:false
                        });
                    }
                        
                    

                }).catch((error) => {
                    alert("Something Went wrong");
                    console.log(error);
                    this.setState({
                        submitButtonDisable:false
                    });
                    

                });

    }
    saveNotificationToken = () => {
        alert("noti");
    }
    createAccount = () =>{
        console.log("wait and fill the form");
        this.props.navigation.navigate('SingIn');
        
    }
    forgetPasswrod =() =>{
        this.props.navigation.navigate('ForgetPass');
    }
    render() {
        if(this.state.login_status){
           return( this.props.navigation.navigate('MainMenu'));
        }
        else{
            return (
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={styles.parentContainer}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../../pic/logo.png')} />
                                <Text style={styles.H1}>Welcome to MarketG</Text>
                                <Text style={styles.H4}>Thanks for installing - let's start shoping!</Text>
                                <TextInput 
                                    underlineColorAndroid='#0084ff' 
                                    style={styles.textInput} 
                                    placeholder="Email or phone"
                                    onChangeText={(text) => this.setState({email_or_phone:text})} 
                                />
                                <TextInput 
                                    underlineColorAndroid='#0084ff' 
                                    style={styles.textInput} 
                                    placeholder="Password" 
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({password:text})} 
                                
                                />
                                <Button 
                                    style = {styles.button} 
                                    title="CONTINUE" 
                                    onPress={this.submitLogin}
                                    value = "CONTINUE"
                                    disabled = {this.state.submitButtonDisable}
                                    
                                ></Button>
                                <View style={styles.Process}>
                                    <ActivityIndicator 
                                        style = {{ opacity : this.state.submitButtonDisable ? 1 : 0 }} 
                                        size="large" 
                                        color="#00ff00" />
                                </View>
                                
                                <TouchableOpacity onPress={this.forgetPasswrod}>
                                    <Text style={styles.H41}>FORGOT PASSWORD?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.createAccount}>
                                    <Text style={styles.H5}>Not on MarketG?</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            );

        }
   
  }
}



const styles = StyleSheet.create({
    parentContainer:{
        
    },
    container:{
        
        backgroundColor: '#ffffff',
        
        
        alignSelf: 'center',
        justifyContent: 'center',
        
       
        //alignItems :'center'
    },
    textInput:{  
        textAlign: 'justify',
        marginBottom: 7,
        height: 40,
        //borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#2196F3',
        
        // Set border Radius.
        borderRadius: 5 ,
        paddingLeft: 3,
        // Set border Radius.
        //borderRadius: 10 ,
    },
    H1:{
        fontSize: 30,
        fontWeight: '400',
        color: "#000",
        textAlign: 'center', 
        marginBottom: 15
    },
    image:{
        justifyContent: 'flex-start',
        alignSelf: 'center',
        margin: 55,
    },
    H4:{
        fontSize: 13,
        fontWeight: '400',
        color: "#999999",
        textAlign: 'center', 
        marginBottom: 15
    },
    H41:{
        fontSize: 15,
        fontWeight: '500',
        color: "#359dff",
        textAlign: 'center', 
        marginBottom: 15
    },
    
    H5:{
        marginTop: '15%',
        fontSize: 30,
        fontWeight: '400',
        color: "#999999",
        textAlign: 'center', 
        //marginBottom: 15
    },
    button:{
        //marginTop: 50,
        
    },
    Process:{
        //marginTop: 20,
    }
});


class SignInScreen extends React.Component
{
    render(){
        return(<Register /> )
    }
}
class ForgetPass extends React.Component
{
    render(){
        return(<IdentifyUser/>)
    }
}
class MainScreen extends React.Component
{
    constructor(props){
        super(props)
       //alert(obj1);
    }
    render(){
        return(<View>{ obj1.navigate('AuthLoading')}</View>)
    }
}

const RootStack = createSwitchNavigator(
    {
        Login: LoginScreen,
      SingIn: SignInScreen,
      MainMenu:MainScreen,
      ForgetPass:ForgetPass,
    },
    {
      initialRouteName: 'Login',
      backBehavior:'initialRoute',
     
    }
  );

 
export default class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            obj:this.props.obj,
        }
        obj1=this.state.obj;
    }

    render(){
       
        return(
                <RootStack/>
        );
    }
}


