import {SearchBar} from 'react-native-elements'
import React from 'react';
import {Component,View,Modal,TouchableHighlight,Text} from 'react-native';

export default class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
          };

          this.setModalVisible = this.setModalVisible.bind(this);
    }
    
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    SearchModalView =()=>{
        return (
            <View style={{marginTop: 22}}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>Hello World!</Text>
      
                   
                  </View>
                </View>
              </Modal>
      
             
            </View>
          );
    }
} 
/**  onChangeText={this._onChangeText}
        onClearText={this._onClearText} */