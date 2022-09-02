import { Controller, useForm } from "react-hook-form";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hooks/ApiHooks";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const RegisterForm = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);

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

  const { postUser } = useUser();
  const onSubmit = (data) => register(data);

  const register = async (data) => {
    try {
      const res = await postUser(data);
      console.log(res);
    } catch (error) {
      console.error("register():", error);
    }
  };

  return (
    <View>
      <Text style={styles.header}>Registeration Form</Text>

      <Controller
        control={control}
        rules={{ required: true, minLength: 3 }}
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
      {errors.username?.type === "minLength" && (
        <Text style={styles.error}>Minimum 3 characters.</Text>
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
            placeholder="email"
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && (
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

      <Controller
        control={control}
        rules={{ required: false, minLength: 3 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="full name"
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === "minLength" && (
        <Text style={styles.error}>Minimum 3 characters.</Text>
      )}

      <Button title="Register" onPress={handleSubmit(onSubmit)}></Button>
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

export default RegisterForm;
