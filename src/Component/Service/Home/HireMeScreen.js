import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
    NetInfo,
    Modal,
} from "react-native";
import { 
    Container,
    Spinner,
    Button,
    Text,
    Content,
    Header,
    Left,
    Right,
    Title,
    Body,
    Input,
    Card,
    CardItem,
    List,
    ListItem,
    Form,
    Picker,
    Item,
    Textarea,
    Label,
    Thumbnail
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from "../Global";
const {width,height} = Dimensions.get('window');

export default class HireMeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            submitButtonDisalbe:false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }
    render_HandleSendRequest = async () => {
        var connectionInfoLocal = '';
        var KEY = await AsyncStorage.getItem('userToken_S');
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
            if(connectionInfo.type == 'none'){
                console.log('no internet ');
                ToastAndroid.showWithGravityAndOffset(
                    'Oops! No Internet Connection',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                return;
            }else{
                console.log('yes internet '); 
                this.setState({
                    LodingModal:true,
                    submitButtonDisalbe:true,
                })
                fetch(Global.API_URL+'render_HandleSendRequest_MU', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Authorization':'Bearer '+KEY,
                        },
                        body: JSON.stringify({  })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var itemsToSet = responseJson.data;
                        console.log('resp:',itemsToSet);
                        this.setState({
                            LodingModal:false,
                            
                        });
                        ToastAndroid.showWithGravityAndOffset(
                            'Successuly Sent',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50,
                        );
                        // this.props.navigation.navigate('BackTOHome',{
                        //     ProfileData:itemsToSet,
                        // });
                }).catch((error) => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Network Failed!!! Retrying...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                    console.log('on error fetching:'+error);
                    this.render_HandleSendRequest();
                    this.setState({
                        submitButtonDisalbe:false,
                    })
                });
            }
        });
        console.log(connectionInfoLocal);
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                        <Card>
                            <CardItem>
                                <Thumbnail square source={{ uri: 'https://instagram.fpat1-1.fna.fbcdn.net/vp/84c4e443d47dc2aa70a613a017a4c001/5CBB0AAC/t51.2885-19/s150x150/31908285_2109461939310314_4190149362170462208_n.jpg?_nc_ht=instagram.fpat1-1.fna.fbcdn.net' }} />
                                <Text style={{marginLeft:10,fontSize:25,fontWeight:'700'}}>Aarav Kumar</Text>
                            </CardItem>
                        </Card>
                        <Card>
                            <Form>
                                <Item>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        style={{ width: undefined }}
                                        // selectedValue={}
                                        // onValueChange={}
                                    >
                                        <Picker label="Wallet" value="key0" />
                                        <Picker label="ATM Card" value="key1" />
                                        <Picker label="Debit Card" value="key2" />
                                        <Picker label="Credit Card" value="key3" />
                                        <Picker label="Net Banking" value="key4" />
                                    </Picker>
                                </Item>
                                
                                <Item regular>
                                    <Input placeholder='Enter your work Title'/>
                                </Item>
                                <Textarea rowSpan={5} bordered placeholder="Type Some Message..." />
                                <Button block danger
                                disabled={this.state.submitButtonDisalbe} onPress={this.render_HandleSendRequest}>
                                    <Text>Send Him A Request</Text>
                                </Button>
                            </Form>
                        </Card>
                    
                    </Content>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.LodingModal}
                        onRequestClose={() => {
                            // this.setState({
                            // LodingModal:false
                        // })
                        }}>
                            <AdvLoder/>
                    </Modal>
                </Container>
            );
        }else{
            return (
            <AdvLoder/>
            );
        }
    }
}


class AdvLoder extends Component{
    render(){
        const {width,height} = Dimensions.get('window');
        return(
            <View style={{ flex: 1, width:width, justifyContent: 'center', alignItems: 'center',backgroundColor:'#09090999'}}> 
                <Spinner color='#079bff' size='large' style={{height:40}} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    loder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});