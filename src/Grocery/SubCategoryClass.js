import {AsyncStorage} from "react-native"
import Connection from "../Global/Connection/Connection";

export default class SubCategoryClass{
   
    constructor(){
        super();
        this.state ={
            data:[],
        }
        this.conn= new Connection();
    }

    get =async()=>{
        let temp ={} ;
        try {
            
            temp = await AsyncStorage.getItem("SubCategoryList");
            
        } catch (error) {

            console.log("Error in Get Category Class : ",error);  
                     
        }

        return JSON.parse(temp);
    }

    set = async(value)=>{

        try {
            await AsyncStorage.setItem("SubCategoryList",value);
        } catch (error) {
            console.log("Error in Set Category Class : ",error);
        }   
    }
    

    
}