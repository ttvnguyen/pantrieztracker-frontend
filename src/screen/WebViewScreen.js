import React from "react";
import PropTypes from "prop-types";
import Webview from "react-native-webview";
import Screen from "../component/Screen";

const WebViewScreen = ({ route }) => {
  // const { id } = route.params;
  // const url = `https://www.youtube.com/watch?v=${id}`;
  const url = 'https://www.allrecipes.com/'
  return (
    <Screen>
      <Webview
          originWhitelist={['*']}
          useWebKit={true} 
          source={{ uri: url }} />
    </Screen>
  );
};

export default WebViewScreen;

WebViewScreen.propTypes = {
  route: PropTypes.any,
};
