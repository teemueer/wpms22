import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Image,
} from "react-native";
import { MainContext } from "../contexts/MainContext";
import { useTag } from "../hooks/ApiHooks";
import { baseUrl } from "../utils/config";

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(MainContext);
  const { getFilesByTag } = useTag();
  const [avatar, setAvatar] = useState("http://placekitten.com/640");

  const getAvatar = async () => {
    try {
      const avatar = (await getFilesByTag(`avatar_${user.user_id}`))[0];
      setAvatar(`${baseUrl}/uploads/${avatar.filename}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAvatar();
  }, []);

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
        <Image style={styles.avatar} source={{ uri: avatar }} />
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
  avatar: {
    width: 200,
    height: 200,
  },
});

export default Profile;
