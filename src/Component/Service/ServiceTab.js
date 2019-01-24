import React from 'react';
import { Button, Text, View,Modal,Dimensions,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

import CategoryScreen from './Home/CategoryScreen';
import HistoryListScreen from './History/HistoryListScreen';
import HistoryDetailsScreen from './History/HistoryDeatilsScreen';
import SubCategoryScreen from './Home/SubCategoryScreen';
import ServiceManProfileScreen from './Home/ServiceManProfileScreen';
import HireMeScreen from './Home/HireMeScreen';
import ServiceManListScreen from './Home/ServiceManListScreen';

// const {width,height} = Dimensions.get('window');

// const HeaderTitle = (<Text style={{color:"#fff",padding: 10, marginLeft:5, fontSize: 20 , fontWeight:"900",fontSize:20}}>SirG2</Text>);
// const TitleSubCat = (<Text style={{color:"#fff",padding: 10, marginLeft:5, fontSize: 20 , fontWeight:"900",fontSize:20}}>SirG2</Text>);
class HeaderTitle extends React.Component{
    render(){
        return(
                <Text style={{
                        color:"#fff",
                        padding: 10, 
                        marginLeft:5, 
                        fontSize: 20 , 
                        fontWeight:"900",
                        fontSize:20
                    }}>{this.props.title}
                </Text>
            )
    }
}
class MenuButton extends React.Component{
	render(){
		return(
			<View style={{backgroundColor:"#2874f0"}}>
				<TouchableOpacity onPress={() => { this.props.obj.toggleDrawer() } }>
                    {/* <Icon name="menu" style={{color: 'white', padding: 10, marginLeft:5, fontSize: 35}}/> */}
                    <Icon name="align-left" style={{color: 'white', padding: 10, marginLeft:5, fontSize: 35}}/>
				</TouchableOpacity>
			</View>
		);
	}
}

// Home stack 
const HireMeStack = createStackNavigator(
    {
        HireMeScreen: {
            screen: HireMeScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: <HeaderTitle title="Hire Me"/>,
                headerStyle: {
                    backgroundColor: '#2874f0'
                },
            }),
        } ,
        BackTOHome: {
            screen:CategoryScreen,
            navigationOptions: ({ navigation }) => ({
                header: null
            }),
        }
    },
);

const ServiceManProfileStack = createStackNavigator(
    {
        ServiceManProfileScreen: {
            screen:ServiceManProfileScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: <HeaderTitle title="Profile Info"/>,
                headerStyle: {
                    backgroundColor: '#2874f0'
                },
            }),
        },
        HireMeStack: {
            screen:HireMeStack,
            navigationOptions: ({ navigation }) => ({
                header: null
            }), 
        }
    },
);


const ServiceManListStack = createStackNavigator(
    {
        ServiceManListScreen: {
            screen:ServiceManListScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: <HeaderTitle title="Choose Your service Man"/>,
                headerStyle: {
                    backgroundColor: '#2874f0'
                },
            }),
        },
        ServiceManProfileStack: {
            screen: ServiceManProfileStack,
            navigationOptions: ({ navigation }) => ({
                header: null
            }), 
        }
    },
);

const SubCategoryStack = createStackNavigator(
    {
        SubCategoryScreen: {
            screen:SubCategoryScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: <HeaderTitle title="Sub Category"/>,
                headerStyle: {
                    backgroundColor: '#2874f0'
                },
            }),
        },
        ServiceManListStack:{
            screen: ServiceManListStack,  
            navigationOptions: ({ navigation }) => ({
                header: null
            }), 
        }
    },
);

const HomeStack = createStackNavigator(
    {
        Home:{
            screen:CategoryScreen,
            // navigationOptions: ({ navigation }) => ({
            //     headerTitle: <HeaderTitle title="Service Manager"/>,
            //     headerStyle: {
            //         backgroundColor: '#2874f0'
            //     },
            //     headerLeft: <MenuButton obj={navigation}  />,
            // }),
            navigationOptions: () => ({
                header: null,
            }),
            
        } ,
        SubCategoryStack: {
            screen:SubCategoryStack,
            navigationOptions: ({ navigation }) => ({
                header: null
            }),
        },
    },
);


// history stack
const HistoryDetailsStack = createStackNavigator(
    {
        HistoryDetailsScreen: HistoryDetailsScreen,
    },
    {
        navigationOptions: () => ({
            header: null,
        }),
    }
);

const HistoryStack = createStackNavigator(
    {
        HistoryListScreen: HistoryListScreen,
        HistoryDetailsStack: HistoryDetailsStack,
    },
    {
        navigationOptions: () => ({
            header: null,
        }),
    }
);


export const ServiceTab = createBottomTabNavigator(
    {
        // Home:HireMeStack,
        Home:HomeStack,
        History:HistoryStack,
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName='worker';
            if(routeName == 'Home'){
                iconName =`home${focused?'':''}`;
            } else if (routeName === 'History') {
                iconName = `search${focused ? '' : ''}`;
            }
        
        
            return <Icon name={iconName} size={30} color={tintColor} style={{fontWeight:'900'}}/>;
          },
          
        }),
        tabBarOptions: {
            activeTintColor: '#0087e0',
            inactiveTintColor: '#747474',
            style:{backgroundColor: '#fff'},
            showLabel:false,
        },
            
        animationEnabled: false,
        swipeEnabled: true,
        initialRouteName :'Home',

    },   
);

// # 1111114d

