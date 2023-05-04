import React, { Component, useCallback } from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, Pressable, ScrollView, Alert, StyleSheet, Button, ImageBackground, Platform } from "react-native";

import { black, white } from "../helper/Color";
import BackIcon from "../component/Utils/BackIcon";
import NumericInput from "react-native-numeric-input";
import DateTimePickerEvent from "@react-native-community/datetimepicker";
import {launchImageLibrary} from 'react-native-image-picker';
import { getAddUpdateInventoryUrl, loadImageUrl, 
  viewImageUrl } from './../helper/Api';

class PantryUpdateScreen extends Component{
    constructor(props) {
    super(props);
    const { item, addItem } = this.props.route.params;

    if (addItem) {
      this.state = {
        item: "",
        qty: 0,
        image: "Pick an Image",
        category: "",
        expiry: new Date(),
        image_url: this.defaultImage()
      }
    }
    else {
      this.state = {
        id: item.id.toString(),
        item: item.item,
        qty: item.qty,
        image: item.image,
        category: item.category,
        expiry: item.expiry,
        image_url: item.image
        // isLoaded: false,
      };
    }
    this.imageField = null;
  }

  loadImageToDB = async() => {
    if (this.imageField ){
      const fdata =  (new FormData());
      fdata.append('img', {
        name: this.imageField.fileName,
        type: this.imageField.type,
        uri:  (Platform.OS == 'ios' ? this.imageField.uri.replace('file://', '') : this.imageField.uri)
      });
      console.log(`loadImageURL ${loadImageUrl()}`)
      await fetch(loadImageUrl(), {
          method: 'post',
        body: fdata
      }).then(response => {
          if (!response.ok) {
              Alert.alert(`ERRD ${this.state.image} ${viewImageUrl('1')}`); 
          }
          // resp = response.blob()._j._data;
          const resp = response.headers;
          for (a of resp) {
            // console.log(`IMGID2:  ${a} ` + resp[a] )
            if (a.toString().startsWith('img_id') ) {
              img_id = a.toString().slice(7)
              ret = viewImageUrl(img_id)
              console.log(`IMGID3:  ${a} ` + this.state.image_url)
              this.setState({image_url : ret})
            }        
          }
        }
        ).catch(err => {
          Alert.alert(`ERRC ${this.stage.image}`);
        })
    }
    else {
      this.setState({image_urls:this.defaultImage()});
    }
  }

  defaultImage = () => {
    // console.log(`IN defaultImage ${this.state.image} `)
    return  (this.props.route.params.addItem ?
      viewImageUrl('1') : this.state.image);
  }
  
  addUpdateItem = async (newItem) => {
    const image_urls = [];
    await Promise.all([this.loadImageToDB()]).then(
      ret => { console.log(`HERE ${this.state.image_url.length}`)
        this.runAddUpdate(newItem)
    }
      ).catch(err => console.error(err))
  }

  runAddUpdate = async(newItem) => {
    console.log(`addup ${this.state.image_url}`)
    url =  (newItem ? getAddUpdateInventoryUrl(newItem, null) :
                      getAddUpdateInventoryUrl(newItem, this.state.id));
    
    const state1 = {
        item: this.state.item,
        qty: this.state.qty,
        image: this.state.image_url,
        category: this.state.category,
        expiry: (new Date(this.state.expiry)).toISOString().split('T')[0]
      };
    if (!newItem) {
      state1['id'] = this.state.id;
      // state1['image'] = this.state.image;
    }
    console.log(JSON.stringify(state1));
    this.setState({image : this.state.image_url})
    await fetch(url, {
           method: (newItem ? 'post' : 'put'),
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state1)
         })
    try {
      this.props.navigation.navigate("Home", {needRefresh: true});
    }
    catch(err){
      Alert.alert(`Err2`)
      console.error(err)
    }
  }

  pickImagePress = async () => {
    const includeExtra = false;
    options = {
      // selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    };
    await launchImageLibrary(options,
      (response) => {
        if (!response.didCancel && !response.error) {
          this.imageField = response.assets[0];
          // Alert.alert(`URI: ${this.imageField.uri}`)
        }
        else {
          this.imageField = null;
        }
      }    
      )
  }
  
  jsonDate2mdy (inStr) {
    return  (new Date(inStr)).toISOString().split('T')[0]
  }
  
  componentDidMount() {
    // console.log("update mounted");
  }

  render() {
    const { item, addItem } = this.props.route.params;
    const navigation = this.props.navigation;
    const action = (addItem ? "Add" : "Update")
    return (
     <View>
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>Pantry Tracker {action}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
      </View>
      <View style={{padding: 10}}>
        <Text>Item</Text>
      <TextInput
        style={{height: 40, borderWidth: 1}}
        placeholder={this.state.item}
        onChangeText={newText =>{this.state.item = newText}}
        defaultValue={this.state.item}
      />
        <Text>Category</Text>
      <TextInput
        style={{height: 40, borderWidth: 1}}
        placeholder={this.state.category}
        onChangeText={newText =>{this.state.category = newText}}
        defaultValue={this.state.category}
      />
      <Text>Quantity</Text>
      <NumericInput
        style={{height: 40, borderWidth: 1}}
        value={this.state.qty}
        onChange={value =>{this.state.qty = value}}
        defaultValue={this.state.qty}
      />
      <Button title={this.state.image}
      style={{backgroundImage: "url(`${this.imageField.uri}`"}}
        onPress={() => 
          this.pickImagePress()
        }
        /> 
      <Text>Expiry</Text>
      <DateTimePickerEvent
        // value={new Date('2023-12-23')}
        value={new Date(this.state.expiry)}
        onChange= {(event, selectedExpiry) => {
          currentExpiry = selectedExpiry || this.state.expiry; 
          this.state.expiry = currentExpiry;
        // defaultValue={new Date()}
      }}
      />
    </View>
    <Button title={action} onPress={() => this.addUpdateItem(addItem)} />
    </View>
    );
  }
}

export default PantryUpdateScreen;

PantryUpdateScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
};

const Styles = StyleSheet.create({
  card: {
      borderWidth:2,
      borderColor: 'black',
      borderRadius:10,
      margin:10,
      padding:10
  },
  desc:{
      color: 'black',
      fontSize: 22,
      fontWeight: '400'
  }
})

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor: white,
    marginTop: 4,
    marginBottom: 12,
    alignSelf: "center",
  },
});


