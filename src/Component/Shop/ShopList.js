import React from 'react';
import {
            ActivityIndicator,
            AsyncStorage,
            Button,
            StatusBar,
            StyleSheet,
            TouchableOpacity,
            Image,
            View,
            Text,
            FlatList,
            ScrollView
        } from 'react-native';
import Connection from '../../Global/Connection/Connection';
import { SearchBar } from 'react-native-elements'

const sql="SELECT * from shop_info_table";

export default class ShopList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],//store data of category items
            process:false,
            obj:this.props.obj,
            serachText:"",
            fullData:'',
        }
        this.conn = new Connection();
    }

    
    componentWillMount(){
       
        this._inslized();
    }

    _inslized=async()=>{ 

       let value = await this.conn.Query(sql)
        if(value.flag){
            this.setState({data:value.data,fullData:value.data});  
            console.log(this.state.data);  
        }
    }

    _storeData=async(sID) =>{
        try{
         
            await AsyncStorage.setItem('ShopID',sID)
            this.state.obj.navigate('Category');
        }
        catch(error){
            console.log("Eroor he Product list me ",error);
        }
    }


    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,'+item.subcategory_pic;

        return(
            <View style={{flex:1,}}>
                  <TouchableOpacity onPress={()=>{this._storeData(item.shop_info_id)}} >
                    <View style={{  flex:1,
                                        backgroundColor:'#f2d56d', 
                                        padding:5,
                                        width:"100%", 
                                        height:150, 
                                        borderRadius:5,
                                        borderWidth:1,}}>
                        <View style={{width: '100%', height: 100,justifyContent:'center',}}>
                            <Image style={{width: '100%', height: 100,borderRadius:5,flex:1}} source={{uri:yourBase64Icon}}/>
                        </View> 
                        <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>{item.name}</Text>
                        </View>

                    </View>
                    
                </TouchableOpacity>
                <Button title="Details" onPress={()=>{   this.state.obj.navigate('ShopDetail');  }}/>
            </View>           
                        
        );
        
    }   

      
    _renderHeader=() =>{
        return <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
        
     }

     _onChangeText=(text) =>{
         try {
             console.log(text);
             let local = this.state.fullData;
             let temp =[];
             local.forEach(element => {
                if(element.name.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 ){
                    temp.push(element);
                    console.log(element)
                } else{ console.log(element)} 
             });
             this.setState({data:temp});
                      
             
         } catch (error) {
             console.log(error)
         }
     }

    
    render(){
    
        return(<View style={{width:'100%',flex:1,padding:10,}}>
                <SearchBar
        round
        onChangeText={this._onChangeText}
        onClearText={this._onClearText}
        placeholder='Type Here...' />
                    <ScrollView
                    
                      
                    >                   
                         <FlatList
                            data={this.state.data}
                            renderItem={this._renderIteam}
                            keyExtractor={item => item.shop_info_id}
                            ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>Wait List is Loading.....</Text>

                            </View>);}}  
                           
                            numColumns='1'
                            />

                        <View style={{paddingTop:10}}>
                          
                        </View>
                    </ScrollView>

                </View>);
    }
}