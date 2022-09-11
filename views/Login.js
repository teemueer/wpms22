import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import { MainContext } from "../contexts/MainContext";
import { useUser } from "../hooks/ApiHooks";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Card } from "@rneui/base";

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(MainContext);
  const { getUserByToken } = useUser();
  const [showRegForm, setShowRegForm] = useState(false);

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
      {showRegForm ? <RegisterForm /> : <LoginForm />}
      <Card>
        <Button onPress={() => setShowRegForm(!showRegForm)}>
          {showRegForm ? "Already have an account?" : "No account yet?"}
        </Button>
      </Card>
    </View>
  );
};

export default Login;
