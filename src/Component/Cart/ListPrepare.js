import { StyleSheet,SectionList,RefreshControl,Text,ToastAndroid, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';


export  async function ProductListing(productID,shopID,Quntity,Unit,Price,pListID){
   let flag = true;
   try{
        let data =await AsyncStorage.getItem('List');

        let q = '#productID:'+productID+",ShopID:"+shopID+",Quntity:"+Quntity+',Unit:'+Unit+",Price:"+Price+",PListID:"+pListID;
        console.log(q);
        data =data+ q;

        const id = await AsyncStorage.getItem('ItemInCart');
        const l = parseInt(id,10)+1;
        await AsyncStorage.setItem('ItemInCart',l.toString());
    await AsyncStorage.setItem('List',data);
    // await AsyncStorage.mergeItem('List', JSON.stringify(UID123_del));

        console.log(":Items in cart  :"+await AsyncStorage.getItem('List'));
        ToastAndroid.show('Add to cart !', ToastAndroid.SHORT);

   
    }catch(error){
            console.log("Error in token part ",error);
        }
    return flag;
  }
  