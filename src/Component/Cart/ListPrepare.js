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
  
  

//   export async function  listReturn(){
//       try{
//            await AsyncStorage.setItem('test',JSON.stringify([{hello:'Heloo sir g',telo:56},{hello:'Heloo sir g',telo:56}]));
//            alert("value set");
//       }
//       catch (error){
//         alert("error")
//       }
    
//   }