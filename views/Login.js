import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { MainContext } from "../contexts/MainContext";

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log("token", userToken);
      if (userToken === "abc") {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("checkToken():", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    try {
      setIsLoggedIn(true);
      await AsyncStorage.setItem("userToken", "abc");
    } catch (error) {
      console.error("logIn():", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
