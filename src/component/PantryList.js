import React from "react";
import PropTypes from "prop-types";
import { FlatList, Text } from "react-native";

import PantryItemInfo from "./PantryItemInfo";
const PantryList = ({ results, navigation, onReachEnd, onRefresh }) => {
  return (
    <FlatList bounces={false}
      keyExtractor={(item) => item.id.toString()}
      keyboardShouldPersistTaps={"handled"}
      data={results}
      renderItem={({ item }) => <PantryItemInfo item={item} navigation={navigation}
       onRefresh={onRefresh} />}
      contentContainerStyle={{ marginVertical: 8 }}
      onEndReached={onReachEnd}
      onEndReachedThreshold={0.9}
    />
  );
};

export default PantryList;

PantryList.propTypes = {
  results: PropTypes.array,
  filter: PropTypes.string,
  navigation: PropTypes.object,
  onReachEnd: PropTypes.func,
  onRefresh: PropTypes.func
};

PantryList.defaultProps = {
  onReachEnd: null,
};
