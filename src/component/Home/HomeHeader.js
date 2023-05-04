import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import MIcon from "react-native-vector-icons/MaterialIcons";
import MenuIcon from "../../assets/icons/open-menu.png";

class HomeHeader extends Component {
  menuIcon = () => {
    const { navigation, onRefresh } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
        <FastImage source={MenuIcon} style={{ width: 20, height: 20 }} />
      </TouchableWithoutFeedback>
    );
  };

  addIcon = () => {
    const { navigation, onRefresh } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(
        "PantryUpdate", { item: null, addItem : true})
        }>
        <MIcon name={"add"} size={20} />
      </TouchableWithoutFeedback>
    );
  };
  

  render() {
    return (
      <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
        {this.menuIcon()}
        {this.addIcon()}
        {/* {this.searchIcon()} */}
      </View>
    );
  }
}

export default HomeHeader;

HomeHeader.propTypes = {
  navigation: PropTypes.object,
};
