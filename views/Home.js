import React from "react";
import { View } from "react-native";
import List from "../components/List";
import PropTypes from "prop-types";

const Home = ({ navigation }) => {
  return (
    <View>
      <List navigation={navigation} />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
