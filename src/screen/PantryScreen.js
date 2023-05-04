import React, { Component } from "react";
import PropTypes from "prop-types";

import HomeComponent from "../component/Home/HomeComponent";
import { requestPantryInventory } from "../helper/Api";

class PantryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pantryData: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus',
    () => {
          this.requestPantryScreen();
    });
    this.requestPantryScreen();
  }

  componentWillUnmount(){
    this._unsubscribe();
  }
  
  requestPantryScreen = async () => {
    await requestPantryInventory((data, err) => { 
      this.setState({ pantryData: data[0] });
    });
  };

  render() {
    return (
      <HomeComponent
        navigation={this.props.navigation}
        data={this.state.pantryData}
        onRefresh={this.requestPantryScreen}
      />
    );
  }
}

export default PantryScreen;

PantryScreen.propTypes = {
  navigation: PropTypes.object,
};
