import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { MainContext } from "../contexts/MainContext";
import { useUser } from "../hooks/ApiHooks";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(MainContext);
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const user = await getUserByToken(userToken);
        setUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("checkToken():", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
        activeOpacity={1}
      >
        <LoginForm />
        <RegisterForm />
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
