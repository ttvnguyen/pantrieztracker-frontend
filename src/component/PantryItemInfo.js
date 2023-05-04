import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet, View, TouchableWithFeedback, TouchableWithoutFeedback, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FastImage from "react-native-fast-image";
import { getDeleteInventoryUrl } from "../helper/Api"

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
  
  render() {
    const { item, navigation, onRefresh } = this.props;
    
    return (
      <ScrollView style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <TouchableWithoutFeedback
          onPress={() => {
              navigation.navigate("PantryUpdate", { item: item, addItem : false });
          }}
        >
        <View key={item.category} style={styles.card}>
            <Text style={styles.desc}>Description: {item.item}</Text>                        
            <Text>Quantity: {item.qty}</Text>
          <View>               
              <View>
                <TouchableWithoutFeedback onPress={() => {this.deleteItem(item.id)}}>
                  <Icon name={"trash-2"} size={20} />
                </TouchableWithoutFeedback>
              </View>
          </View>
              <FastImage style={{ height:100, width:200 }} resizeMode="cover" 
                source={{uri: item.image}} />
        
          <Text>Category: {item.category}</Text>
          <Text>Expiry: {item.expiry}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

export default PantryItemInfo;

PantryItemInfo.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
  onRefresh: PropTypes.func
};

const styles = StyleSheet.create({
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