import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
} from "react-native";
import { Container, Spinner, Button, Text,Content} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HistoryListScreen extends Component {
    constructor(props){
        super(props);
        this.state = { 
            renderCoponentFlag: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                        <Button bordered dark onPress={()=>{this.props.navigation.navigate('HistoryDetailsScreen');}}>
                            <Text>HistoryListScreen</Text>
                        </Button>
                    </Content>
                </Container>
            );
        }else{
            return (
                <View style={styles.loder}>
                <Spinner  color='blue'/>
                </View>
            );
        }
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