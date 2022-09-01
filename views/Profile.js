import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { MainContext } from "../contexts/MainContext";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("logout():", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title={"Log out"} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
});

export default Profile;
