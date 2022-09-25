import React, { useEffect } from "react";
import { View } from "react-native";
import List from "../components/List";
import PropTypes from "prop-types";
import * as ScreenOrientation from "expo-screen-orientation";

const Home = ({ navigation }) => {
  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error("unlock()", error.message);
    }
  };

  useEffect(() => {
    unlock();
  }, []);

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
