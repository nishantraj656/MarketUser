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
    FlatList,
    TouchableHighlight,
    Platform,
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
    Thumbnail,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const {width,height} = Dimensions.get('window');

export default class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            ListData:[
                {title: 'Title Text1', key: 'item1'},
                {title: 'Title Text2', key: 'item2'},
                {title: 'Title Text3', key: 'item3'},
                {title: 'Title Text4', key: 'item4'},
                {title: 'Title Text5', key: 'item5'},
                {title: 'Title Text6', key: 'item6'},
                {title: 'Title Text7', key: 'item7'},
                {title: 'Title Text8', key: 'item8'},
                {title: 'Title Text9', key: 'item9'},
                {title: 'Title Text10', key: 'item10'},
                {title: 'Title Text11', key: 'item11'},
                {title: 'Title Text12', key: 'item12'},
                {title: 'Title Text13', key: 'item13'},
                {title: 'Title Text14', key: 'item14'},
                {title: 'Title Text15', key: 'item15'},
                {title: 'Title Text16', key: 'item16'},
                {title: 'Title Text17', key: 'item17'},
                {title: 'Title Text18', key: 'item18'},
                {title: 'Title Text19', key: 'item19'},
                {title: 'Title Text20', key: 'item20'},
                {title: 'Title Text21', key: 'item21'},
                {title: 'Title Text22', key: 'item22'},
                {title: 'Title Text23', key: 'item23'},
                {title: 'Title Text24', key: 'item24'},
            ]
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        let ListDataNew = this.state.ListData;
        ListDataNew.push({title: 'new21', key: 'newdata21'});
        ListDataNew.push({title: 'new22', key: 'newdata22'});
        ListDataNew.push({title: 'new24', key: 'newdata23'});
        ListDataNew.push({title: 'new25', key: 'newdata24'});
        ListDataNew.push({title: 'new26', key: 'newdata25'});
        ListDataNew.push({title: 'new27', key: 'newdata26'});
        console.log("ListDataNew:",ListDataNew.length);
        if(renderCoponentFlag){
            return(
                <View>
                    <Header/>
                    <View>
                        <Button bordered dark>
                            <Text>Test</Text>
                        </Button>
                        <FlatList
                            ItemSeparatorComponent={
                                Platform.OS !== 'android' && 
                                                                                <View style={[style.separator, highlighted && {marginLeft: 0}]} />
                                                                                
                            }
                            onEndReached = {()=>{
                                console.log("end react");
                                this.setState({
                                    ListData:ListDataNew
                                })
                            }}
                            onEndReachedThreshold={0.9}
                            data={this.state.ListData}
                            renderItem={({item, separators}) => (
                                <TouchableHighlight
                                onPress={() => {console.log(item)}}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{backgroundColor: 'white'}}>
                                    <Text style={{fontSize:40}}>{item.title}</Text>
                                </View>
                                </TouchableHighlight>
                            )}
                            />

                       
                    </View>
                </View>
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
            <View style={{ flex: 1, width:width, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}> 
                <Spinner color='#2874f0' size='large' style={{height:40}} />
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