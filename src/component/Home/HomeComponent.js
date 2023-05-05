import React, { Component } from "react";
import PropTypes, { string, object } from "prop-types";
import { ScrollView, Text, TextInput, View, StyleSheet, RefreshControl, Platform, Alert } from "react-native";

import Screen from "../Screen.js";
import PantryList from "../PantryList.js";
import HomeHeader from "./HomeHeader";
import { normalize } from "../../helper/FontSize"
import { getStatusBarHeight } from "react-native-status-bar-height";;
import { orange, lightGray } from "../../helper/Color";
import Icon from "react-native-vector-icons/Ionicons";


class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      isRefreshing: false,
    };
  }

  onRefresh = async () => {
    this.setState({ isRefreshing: true });
    await this.props.onRefresh();
    this.setState({ isRefreshing: false });
  };

  renderHeader = () => {
    const { navigation } = this.props;
    return <HomeHeader navigation={navigation} />;
  };

  renderSearchText = () => {
    return (
      <View style={Styles.searchContainer}>
        <Icon name={"search"} size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={Styles.searchInput}
            placeholder={"Milk"}
            onChangeText={(text) => {
              this.setState({ filter:  text })
              this.renderPantryComponent()}}
            returnKeyType={"search"}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  renderTitle = () => {
    const title = "Pantry Tracker";
    return (
      <View>
        <View>
          <Text style={Styles.screenTitle}>{title}</Text>
          <View style={Styles.titleBar} />
        </View>
        {this.renderSearchText()}
      </View>
    );
  };
  onReachEnd = () => {}

  renderPantryList = () => {
    const { navigation, data } = this.props;
    filter=this.state.filter
    data1 = data.filter(row => row.item.includes(filter))
    return ( 
      <View>
        <Text style={{ alignSelf: "center", fontSize: 20}}>Total Items: {data1.length}</Text>
        <PantryList results={data1} navigation={navigation} 
            onReachEnd={this.props.onReachEnd} onRefresh={this.props.onRefresh}/> 
      </View>)
  };

  renderPantryComponent = () => {
    const { isRefreshing } = this.state;
    return (
      <View
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onRefresh} />}
        showsVerticalScrollIndicator={true}
      >
        {this.renderTitle()}
        {this.renderPantryList()}
      </View>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderHeader()}
        {this.renderPantryComponent()}
      </Screen>
    );
  }
}

export default HomeComponent;

HomeComponent.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.arrayOf(object),
  onRefresh: PropTypes.func
};

const Styles = StyleSheet.create({
  screenTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: normalize(30),
    margin: 16,
    marginBottom: 0,
  },

  titleBar: {
    width: 270,
    height: 5,
    backgroundColor: orange,
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },

  searchContainer: {
    marginHorizontal: 16,
    backgroundColor: lightGray,
    borderRadius: 24,
    flexDirection: "row",
  },

  searchInput: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
});