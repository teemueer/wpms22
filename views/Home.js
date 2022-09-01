import React from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import List from "../components/List";
import PropTypes from "prop-types";

const Home = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List navigation={navigation} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;