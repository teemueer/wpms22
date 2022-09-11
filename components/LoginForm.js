import { Controller, useForm } from "react-hook-form";
import { Input, Button, Text, Card } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../hooks/ApiHooks";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const LoginForm = () => {
  const { setIsLoggedIn, setUser } = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { postLogin } = useLogin();
  const onSubmit = (data) => logIn(data);

  const logIn = async (userCredentials) => {
    try {
      const data = await postLogin(userCredentials);
      setUser(data.user);
      setIsLoggedIn(true);
      await AsyncStorage.setItem("userToken", data.token);
    } catch (error) {
      console.error("logIn():", error);
    }
  };

  return (
    <Card>
      <Card.Title>Login</Card.Title>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="username"
            autoCapitalize="none"
            errorMessage={
              errors.username && <Text>This field is required.</Text>
            }
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            errorMessage={
              errors.password && <Text>This field is required.</Text>
            }
          />
        )}
        name="password"
      />

      <Button title="Sign in" onPress={handleSubmit(onSubmit)}></Button>
    </Card>
  );
};

export default LoginForm;
