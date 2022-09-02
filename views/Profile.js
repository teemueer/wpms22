import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Button, View } from "react-native";
import { MainContext } from "../contexts/MainContext";

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(MainContext);

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
      <View style={styles.userDetails}>
        <Text style={styles.header}>Profile</Text>
        <Text>User ID: {user.user_id}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Full name: {user.full_name ? user.full_name : "N/A"}</Text>
        {user.time_created && (
          <Text>
            Registered: {new Date(user.time_created).toLocaleDateString()}
          </Text>
        )}
      </View>
      <Button title={"Log out"} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDetails: {
    flex: 1,
  },
});

export default Profile;
