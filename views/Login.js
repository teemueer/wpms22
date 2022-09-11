import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { View } from "react-native";
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
    <View>
      <LoginForm />
      <RegisterForm />
    </View>
  );
};

export default Login;
