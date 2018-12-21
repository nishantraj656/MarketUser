import { StyleSheet,SectionList,RefreshControl,Text,ToastAndroid, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';

state={
    listData:[]
}

export  async function ProductListing(productID,shopID,Quntity,Unit,Price,pListID,uri){
   let flag = true;
   try{
    // await AsyncStorage.removeItem('List');
    // await AsyncStorage.removeItem('ItemInCart');
   
       test(productID,shopID,Quntity,Unit,Price,pListID,uri);
        let data =await AsyncStorage.getItem('List');
        state.listData.push(data);
       
        const id = await AsyncStorage.getItem('ItemInCart');
        const l = parseInt(id,10)+1;
        await AsyncStorage.setItem('ItemInCart',l.toString());
  
   

        ToastAndroid.show('Add to cart !', ToastAndroid.SHORT);

   
    }catch(error){
            console.log("Error in token part ",error);
        }
    return flag;
  }


 async function test(productID,shopID,Quntity,Unit,Price,pListID,uri){
    
            let tempArray =[];
            
             let stringify = await AsyncStorage.getItem('List');console.log(stringify);
             if(stringify!=null){
                tempArray = JSON.parse(stringify);
                console.log(stringify.length)
             }

             let tempObj={productID:productID,ShopID:shopID,Quntity:Quntity,Unit:Unit,Price:Price,PListID:pListID,uri:uri};
             tempArray.push(tempObj);
             await AsyncStorage.setItem('List',JSON.stringify(tempArray));
         
      
  }
  
  export async function CartPrepare(item,quantity){

        try {

         // await AsyncStorage.setItem('CartList',JSON.stringify([]));
          console.log(item);
           
           let cartValue =[];
            let temp =item;
                temp['Quantity']=quantity;
                temp['flag']=true;
            let value = await AsyncStorage.getItem('CartList');
            if(value == null){
                cartValue.push(temp);
                await AsyncStorage.setItem('CartList',JSON.stringify(cartValue));
            } 
            else{
                let flag=false;
                let tempArray = JSON.parse(value);
                for(var i=0;i<tempArray.length;i++){
                    let tempValue = tempArray[i];
                    if(tempValue.gro_map_id == temp.gro_map_id){
                         tempArray[i] = temp;
                        flag=true;
                        console.log("update ",temp.gro_map_id);
                        break;
                   }
                }
                if(!flag){
                    tempArray.push(temp);
                    console.log("Neww add");
                }
                console.log(tempArray);
                await AsyncStorage.setItem('CartList',JSON.stringify(tempArray));
            }
           
        } catch (error) {
            console.log("Error in cart list",error.message());
        } 
        
  }

  /** remove product */
  export async function CartRemoveItem(item){

    try {

     //   await AsyncStorage.setItem('CartList',JSON.stringify([]));
       
       let cartValue =[];
       
        let value = await AsyncStorage.getItem('CartList');
        if(value == null){
           return
        } 
        else{
            let flag=false;
            let tempArray = JSON.parse(value);
            for(var i=0;i<tempArray.length;i++){
                let tempValue = tempArray[i];
                if(tempValue.gro_map_id != item.gro_map_id){
                     
                    cartValue.push(tempArray[i]) 
                    
               }
            }
           
            console.log(tempArray);
            await AsyncStorage.setItem('CartList',JSON.stringify(cartValue));
        }
       
    } catch (error) {
        console.log("Error in cart list",error.message());
    } 
    
}

    /**Restaurant cart Preprae */
export async function ResCartPrepare(item,quantity){

    try {

     // await AsyncStorage.setItem('CartList',JSON.stringify([]));
      console.log(item);
       
       let cartValue =[];
        let temp =item;
            temp['Quantity']=quantity;
            temp['flag']=true;
        let value = await AsyncStorage.getItem('resCartList');
        if(value == null){
            cartValue.push(temp);
            await AsyncStorage.setItem('CartList',JSON.stringify(cartValue));
        } 
        else{
            let flag=false;
            let tempArray = JSON.parse(value);
            for(var i=0;i<tempArray.length;i++){
                let tempValue = tempArray[i];
                if(tempValue.gro_map_id == temp.gro_map_id){
                     tempArray[i] = temp;
                    flag=true;
                    console.log("update ",temp.gro_map_id);
                    break;
               }
            }
            if(!flag){
                tempArray.push(temp);
                console.log("Neww add");
            }
            console.log(tempArray);
            await AsyncStorage.setItem('CartList',JSON.stringify(tempArray));
        }
       
    } catch (error) {
        console.log("Error in cart list",error.message());
    } 
    
}

/**Restaurant cart remove product */
export async function ResCartRemoveItem(item){

try {

 //   await AsyncStorage.setItem('CartList',JSON.stringify([]));
   
   let cartValue =[];
   
    let value = await AsyncStorage.getItem('CartList');
    if(value == null){
       return
    } 
    else{
        let flag=false;
        let tempArray = JSON.parse(value);
        for(var i=0;i<tempArray.length;i++){
            let tempValue = tempArray[i];
            if(tempValue.gro_map_id != item.gro_map_id){
                 
                cartValue.push(tempArray[i]) 
                
           }
        }
       
        console.log(tempArray);
        await AsyncStorage.setItem('CartList',JSON.stringify(cartValue));
    }
   
} catch (error) {
    console.log("Error in cart list",error.message());
} 

}
