import { Permissions, Notifications } from 'expo';
import {AsyncStorage} from 'react-native';  


export  async function registerForPushNotificationsAsync(user,password){
   let flag = true;
   try{
    const PUSH_ENDPOINT = 'https://3day.000webhostapp.com/run_query.php';
  
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions 
    if (finalStatus !== 'granted') {
       
      return;
    }
  
    // Get the token that uniquely identifies this device
   let token = await Notifications.getExpoPushTokenAsync();
   console.log("En token value ",token);
    
    let updated_time = new Date().toJSON().slice(0, 19).replace('T', ' ');
    sql = "UPDATE `security_table` SET `updated_at`='"+updated_time+"' , `noti_token`='"+token+"' WHERE((email = '"+user+"' or phone_no = '"+user+"' ) AND password = '"+password+"')";
    //"INSERT INTO `customer_info_table`(`user_id`) VALUES (())";
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
                if(responseJson == "YES"){
                    console.log("noti enableed");  
                   AsyncStorage.setItem('token',token);
                    flag = true;  
                }
                else {
                    alert("Opps!! Something looks wrong.Please Report to developer.")
                }

            }).catch((error) => {
                alert("Something Went wrong");
                console.log(error);
                this.setState({
                    submitButtonDisable:false
                });         

            }); 
        }catch(error){
            console.log("Error in token part ",error);
        }
    return flag;
  }
  