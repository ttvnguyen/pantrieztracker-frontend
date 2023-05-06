import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { SafeAreaView, StyleSheet, View, TouchableWithFeedback, TouchableWithoutFeedback, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FastImage from "react-native-fast-image";
import { getDeleteInventoryUrl } from "../helper/Api"
import * as RNLocalize from 'react-native-localize';

class PantryItemInfo extends PureComponent {
  deleteItem = async (itemid) => {
    let sid = itemid.toString();
    console.log(`Deletes ${itemid}`)
    deleteUrl =  getDeleteInventoryUrl(sid)
    console.log(deleteUrl);
    await fetch(deleteUrl, {
           method: 'delete'
    })
    // this.props.navigation.navigate("Home", {needRefresh: true});
    this.props.onRefresh();
  }
  
  // convertTZ =(date, tzString) =>{
  //   return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
  // }

  render() {
    const { item, navigation, onRefresh } = this.props;
    //extra day untill items expire
    extraDays = 2
    //Set alert day = today plus extra days
    alertDate = new Date( Date.now() + extraDays * 24 * 60 * 60 * 1000)
    // console.log(`TIMEZONE: ${RNLocalize.getTimeZone()}`)
    // tzString = RNLocalize.getTimeZone()
    // const dateString = (new Date()).toLocaleString("en-US" ,tzString)
    // const dateString = (new Date('2023-05-13T00:14:28.000-18:00')).toLocaleString("en-US" ,tzString)

    return (
      <SafeAreaView bounces={false} 
        alwaysBounceVertical={false}
        style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <TouchableWithoutFeedback
          onPress={() => {
              navigation.navigate("PantryUpdate", { item: item, addItem : false });
          }}>
          <View key={item.category} 
                style={((new Date(item.expiry))<= alertDate) ? _styles. alertCard : _styles.card}>
              <Text style={_styles.desc}>Description: {item.item}</Text>                        
              <Text>Quantity: {item.qty}</Text>
                           
              <View>
                  <TouchableWithoutFeedback onPress={() => {this.deleteItem(item.id)}}>
                    <Icon name={"trash-2"} size={20} />
                  </TouchableWithoutFeedback>
              </View>
              <View>
                <FastImage style={{ height:100, width:200 }} resizeMode="cover" 
                  source={{uri: item.image}} />
              </View>
                <Text>Category: {item.category}</Text>
                <Text>Expiry: {item.expiry}</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default PantryItemInfo;

PantryItemInfo.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func
};

const _styles = StyleSheet.create({
  card: {
      borderWidth:2,
      borderColor: 'black',
      borderRadius:10,
      margin:10,
      padding:10       
  },
  alertCard: {
    borderWidth:2,
    borderColor: 'red',
    borderRadius:10,
    margin:10,
    padding:10,
    backgroundColor: 'red'        
},
  desc:{
      color: 'orange',
      fontSize: 22,
      fontWeight: '400'
  }
})

