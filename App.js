import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Header from "./components/Header";
import List from "./components/List";

const App = () => {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="auto" backgroundColor="#8dc4aa" />
      <View style={style.header}>
        <Header />
      </View>
      <View style={style.list}>
        <List />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 40,
    backgroundColor: "#6d977ed8",
  },
  header: {
    flex: 1,
    marginBottom: 10,
  },
  list: {
    flex: 2,
    marginBottom: 10,
  },
});

export default App;
