import {AsyncStorage} from "react-native"
import Connection from "../Global/Connection/Connection";

export default class CategoryClass{
   
    constructor(){
       // super();
        this.state ={
            data:[],
        }
        this.conn= new Connection();
        this.tokenSet();
    }

    tokenSet = async() =>{

        await  fetch('http://gomarket.ourgts.com/public/api/gro_category', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
          }).then((response) => response.json())
              .then((responseJson) => {
                
               //console.log(responseJson);
                 this.set(responseJson);
            //  console.log("On shop  value :", value);
            }).catch((error) => {
                  
                //  alert("updated slow network");
               console.log( error.message);
              // log.error({error:err})
                //   value.flag=false;
                //   value.data = "Network request failed" ==error.message?  console.log("Check internet connection"):error;
    
              }); 
  
      }

    get =async()=>{
        let temp ={} ;
        try {
            
            temp = await AsyncStorage.getItem("CategoryList");
            
        } catch (error) {

            console.log("Error in Get Category Class : ",error);  
                     
        }
        console.log("In Get ",temp);
        return JSON.parse(temp);
    }

    set = async(value)=>{
        
        let tempData = [];
        tempData.push(value);
       // console.log("In set ",tempData);
        try {
            await AsyncStorage.setItem("CategoryList",JSON.stringify(tempData));
        } catch (error) {
            console.log("Error in Set Category Class : ",error);
        }   
    }
    

    
}