import { Controller, useForm } from "react-hook-form";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
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
    <View>
      <Text style={styles.header}>Login Form</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="username"
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.error}>This field is required.</Text>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.error}>This field is required.</Text>
      )}

      <Button title="Sign in" onPress={handleSubmit(onSubmit)}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    width: 200,
  },
  error: {
    color: "red",
  },
});

export default LoginForm;
