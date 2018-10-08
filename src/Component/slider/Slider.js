import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const sliderCSS = StyleSheet.create({
        container:{
                    flex:1,
                },
    subContainer:{
                    
                },
    
})

export default class Slider extends React.Component {
   
    constructor(props){
        super(props);
        this.state={
            pic:[{img:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg',key:'1'},{img:'https://agriculturewire.com/wp-content/uploads/2018/08/soybean-plants-growing-in-minnesota-crop-850x567-413f5-768x513.jpg',key:'2'},{img:'https://agriculturewire.com/wp-content/uploads/2013/12/wheat-1.jpg',key:'3'},{img:'https://agriculturewire.com/wp-content/uploads/2016/04/grain-e1460492904924.jpg',key:'4'}],
            currentImg:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'
        }

            let i=0;


            // Toggle the state every second
    // setInterval(() => {
    //     if(i>this.state.img.length-1)
    //         i=0;
    //    // console.log(this.state.img[i]);

    //     this.setState({currentImg:this.state.img[i]})
    //     i++;
        
    //   }, 2000);
    }
 
     _renderItems=({item})=>{
         console.log(item.img)
         return( 
            <View style={{width:300,padding:10, borderColor:'#000000',height:150,borderRadius:10}}>
            <ImageBackground
                style={{width: '100%', height: '100%',borderRadius:10}}
                source={{uri: item.img}}
                >
                
            </ImageBackground>
            </View>);
     }
     
     
    
  render() {
       

   
    return (
                <View style={{borderWidth:1,borderColor:'#000000',height:150,justifyContent:'center'}}>
                    <FlatList 
                        data={this.state.pic}
                        renderItem={this._renderItems}
                        ItemSeparatorComponent={()=>{return(<View style={{borderRadius:5,borderColor:'#012160'}}><Text></Text></View>)}}
                        ListEmptyComponent={()=>{
                            if(this.state.process)
                            return(<View style={{justifyContent:'center'}}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                    <Text>Wait List is Loading.....</Text>

                                </View>);
                            else
                            return(<View style={{justifyContent:'center'}}>
                                    <Text>List is empty or Connection problem......</Text>

                                    </View>)}}
                        horizontal
                        />
                </View>
    );
  }
}
