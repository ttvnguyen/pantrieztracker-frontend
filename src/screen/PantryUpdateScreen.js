import React, { Component, useCallback } from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, Pressable, ScrollView, Alert, StyleSheet, Button, Image, ImageBackground, Platform } from "react-native";

import { black, white, orange } from "../helper/Color";
import BackIcon from "../component/Utils/BackIcon";
import NumericInput from "react-native-numeric-input";
import DateTimePickerEvent from "@react-native-community/datetimepicker";
import {launchImageLibrary} from 'react-native-image-picker';
import { getAddUpdateInventoryUrl, loadImageUrl, 
  viewImageUrl } from './../helper/Api';
import { normalize } from "../helper/FontSize"
import Icon from "react-native-vector-icons/Feather"; 
import MenuIcon from "../assets/icons/camera-img.png";
import FastImage from "react-native-fast-image";

class PantryUpdateScreen extends Component{
    constructor(props) {
    super(props);
    const { item, addItem } = this.props.route.params;
    


    if (addItem) {
      this.state = {
        item: "",
        qty: 0,
        category: "",
        expiry: new Date(),
        image_url: this.defaultImage(),
        button_text: "Pick an Image",
        button_image: 
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAq1BMVEX///8tPlAAe78oOk1UX20iNkodMka2vMFXYWz///3h5OWvtLoUK0IlOEsAe8FclcsuiMEAdbwAcLv0+Pmmq7EAfL3EyMzp6+wAecPZ6vIAIjzn8vW10ud8sdlSl85Pj8hcntGaw+DL4O9xo9KSu9wAbbyny95yqtahxNxganY6icZLV2nF1+s7SFljo83P3uhseIN+h5EAGTWWnaPQ1dgAEC5CUF2KkpoADjMYUM1aAAAE5UlEQVRoge2Zi3aqOBSGAwicAGYMqChab61jtbXV6tTz/k82OxAsCXokCM6atfhXbxLgY+8k+0IRatSoUaNGjRo1atTofyv8Xz/A44QxwqPx02Q6nc7miwA+P8h4AC2edUopITrx6eZl9Civ49HMp6Q30HWd6PqA+GT+EDTGY5/qsXrJL536k+ABDsfzpQ5uZganTwB/kVHdWIz/XnKaTp8WhNvdG/RG9VqN8dDndurLFXzSU7MpOLxWctAhvdjVur8CEqAJR/uvpW6IcBg6txTCia9+PMfg6mccXzckhC80AptL2ezAXWuGeUNRF07cDLhzZ/G0sq1NuNX+izrZeYvahnZDRhQi/E65q2ecAujP5BghHWWLHbN9C8vIW2B9+IS52n/GbJXDN/Pwgg5ih9NPNZsxbpkFwJq1g/W1iV3LwCjoTOFnbwH4YeIIOlf0dt8qAtasLoTNHltO9IM975T+BdCNv0DM4TF5pcRFaF+Q7KZ7iExGOJhQRkadgQ9Wj5PFPVG0+VeRWQayjdAnj5qz0YyShAzpavGaRBc6VSLjwmSw+TOeZgglG9rTCSdDsiRlbM6TDdOyrPzT8HlOgzaIk8+iMyVfy+T21/fBtbvrL3nBW3u2tvWMZLL/cofNhrd2kuPByRPJ7RYcnQ3IdTJ9V0pXItk7/NRUtmS1FSA0p9fJRFfL0QIZPHo+jpErWu31ERr9wdv0WS1DZ8mGIU7UTrDahIlGT/QamQw+lUwWyLB8BR0j0egwTopXyHSlmDCyZDOUBqWJPsAcvC7PO4tFT05mQVW1EsuQjW95UHS34TmAXp3rnxlc3eH5mizfVZNzltySh05iSDdbLB9vaLqWJ7NJOsnLsaLFArn9Jg/upY3lnRh6xYtAQvgeI5SO1cs/YVcF0mBLrlRY8MZ4DrE6rfIZ2J8MS5S8wtruC40pDqQwlqCBPVr1/LirAlG6GeMyPR2Qz4aZa7El7ubJWnSIS87R+KPD7O51nhbKzDxZi/pZsnOxZIjWbIWzcmg0HA5ZHVaywhfImsfyBbstfIVvl+sz09vH+z72cCk/XyIbrPJIbnXcXi0MTW/XDzN3qIIMVv+ynSAI+zu5ODAiK8s233YH1+2eWm5VZK1tGdutZsoGm9+hK8x7XLpYVuSWBOfJ1zx8RGh9oWLz6iabLHMfL8x87eRtvKJ2+X1WN9mz45PDh9ts7viuPeSiWr1kw0t3b/Atn1wvmfXsfNfakTRWKzmuVdJ4AYlTjDx1kqNj5vzjV602G56xPUcx1tb8nI3WZo1kgxX14T6ZUsMQKxXnn/rIBlRFzMpu7Fj2FILETr9SsuXEYGhvIsuMTnIaDNt1kb3umXXc79x8/j1Y9ZCtnVhm5GoOLIST6sjGVm5x8rI9gVxJHRYvqNt3ypTolZGzm/e6+l7l5Hauqbusn0RdFTlyil3lVE32urcvSHTuMqshs+6moM7hpBJykQ11VtpzVUK25Aj9R3F3Q4V2N5l1iQqyrarI1knxygrIyWKxDn23y+S6rl1A/E1GBWQt6ZOKKi1ZqiCXU3ly4Xf6NZAL/h/jiqAwLU227yAb2m/5TVZxYbS9w93t4gH3go5yx6Kg3wWT2xXZXqHXBhfEu9vy6n97pqGstre9F4xRYO9aylp3FXJbo0aNGjVq1KhRo0aN6tG/tSJc7xsH4+0AAAAASUVORK5CYII="
      }
    }
    else {
      this.state = {
        id: item.id.toString(),
        item: item.item,
        qty: item.qty,
        // image: item.image,
        category: item.category,
        expiry: item.expiry,
        image_url: item.image,
        button_text: "Pick an Image",
        button_image: item.image
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
              Alert.alert(`ERRD ${this.state.image_url} ${viewImageUrl('1')}`); 
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
          Alert.alert(`ERRC ${this.stage.image_url}`);
        })
    }
    else {
      this.setState({image_url :this.defaultImage()});
    }
  }

  defaultImage = () => {
    // console.log(`IN defaultImage ${this.state.image} `)
    return  (this.props.route.params.addItem ?
      viewImageUrl('1') : this.state.image_url);
  }
  
  addUpdateItem = async (newItem) => {
    const image_urls = [];
    await Promise.all([this.loadImageToDB()]).then(
      ret => { 
        // console.log(`HERE ${this.state.image_url.length}`)
        this.runAddUpdate(newItem)
      }
      ).catch(err => console.error(err))
  }

  runAddUpdate = async(newItem) => {
    // console.log(`addup ${this.state.image_url}`)
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
          this.setState({button_text : "Image Picked"})
          this.setState({button_image : this.imageField.uri})
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
    // Alert.alert(`IN RENDER ${this.state.button_image}`)
    return (
     <View>
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>Pantry Tracker {action}</Text>
          {/* <View style={{ flex: 1, paddingRight: 12 }}></View> */}
        </View>
        <View style={_styles.titleBar} /></View>
      
      <View style={{padding: 10}}>
        <Text style={_styles.desc}>Item</Text>
        <TextInput
          style={_styles.card}
          placeholder={this.state.item}
          onChangeText={newText =>{this.state.item = newText}}
          defaultValue={this.state.item}
        />
        <Text style={_styles.desc}>Category</Text>
        <TextInput
          style={_styles.card}
          placeholder={this.state.category}
          onChangeText={newText =>{this.state.category = newText}}
          defaultValue={this.state.category}
        />
        <Text style={_styles.desc}>Quantity</Text>
        <NumericInput
          style={{height: 40, borderWidth: 1}}
          value={this.state.qty}
          onChange={value =>{this.state.qty = value}}
          defaultValue={this.state.qty}
        />
        <Pressable onPress={() => this.pickImagePress()}> 
          <Text style={_styles.desc}>Pick an Image</Text>
          <ImageBackground source={{uri: this.state.button_image}}
              style={{width: 100, height: 100, color: orange}}/>
        </Pressable>
        <Text style={_styles.desc}>Expiry</Text>
        <DateTimePickerEvent  
          onChange= {async (event, selectedExpiry) => {
            if (selectedExpiry) {
              this.setState({ expiry : selectedExpiry});
              console.log(`datepick ${selectedExpiry} ${this.state.expiry}`)
            }
          }}
          value={new Date(this.state.expiry)}
          defaultValue={new Date()}
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

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: normalize(20),
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
    margin: 16,
    marginBottom: 0,
  },

  titleBar: {
    width: 240,
    height: 5,
    backgroundColor: orange,
    marginTop: 2,
    marginBottom: 12,
    alignSelf: "center",
  },
  card: {
      borderWidth:2,
      borderColor: 'black',
      borderRadius:5,
      margin:10,
      padding:10
  },
  desc:{
      color: 'black',
      fontSize: 18,
      fontWeight: '400'
  }
});



