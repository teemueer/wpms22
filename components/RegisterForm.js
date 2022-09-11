import { Controller, useForm } from "react-hook-form";
import { Input, Button, Text, Card } from "@rneui/themed";
import { useUser, useLogin } from "../hooks/ApiHooks";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const RegisterForm = () => {
  const { setIsLoggedIn, setUser } = useContext(MainContext);

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      full_name: "",
    },
    mode: "onBlur",
  });

  const { postUser, checkUsername } = useUser();
  const { postLogin } = useLogin();

  const onSubmit = (data) => register(data);

  const register = async (data) => {
    try {
      console.log(data);
      delete data.confirmPassword;
      await postUser(data);
      await postLogin({
        username: data.username,
        password: data.password,
      });
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("register():", error);
    }
  };

  return (
    <Card>
      <Card.Title>Registeration Form</Card.Title>

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This field is required." },
          minLength: { value: 3, message: "Minimum 3 characters" },
          validate: async (value) =>
            (await checkUsername(value)) ? true : "Username is already taken",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="username"
            autoCapitalize="none"
            errorMessage={
              (errors.username?.type === "validate" && (
                <Text>{errors.username.message}</Text>
              )) ||
              (errors.username && <Text>{errors.username.message}</Text>)
            }
          />
        )}
        name="username"
      />

      {/*
      Email pattern:
        name must start with a-z0-9 and can be followed by optional a-z09._-
        domain must start with a-z0-9 and can be followed by optional a-z09._-
        top level domain must start with a-z0-9, followed by optional a-z09 and end with a-z
      */}
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This field is required." },
          maxLength: { value: 254, message: "Email too long" },
          pattern: {
            value:
              /^[a-z0-9]([a-z0-9._-]+)?@[a-z0-9][a-z0-9.-]+.[a-z]([a-z0-9]+)?[a-z]$/i,
            message: "Must be valid email.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="email"
            autoCapitalize="none"
            errorMessage={errors.email && <Text>{errors.email.message}</Text>}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This field is required." },
          minLength: { value: 5, message: "Minimum 5 characters." },
          pattern: {
            value: /.*[0-9].*[\p{Lu}].*/u,
            message:
              "Password must contain at least one number and one capital letter",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            errorMessage={
              errors.password && <Text>{errors.password.message}</Text>
            }
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: (value) =>
            value === getValues("password") ? true : "Passwords do not match",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            errorMessage={
              errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )
            }
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          required: false,
          minLength: { value: 3, message: "Minimum 3 characters." },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="full name"
            errorMessage={
              errors.full_name?.type === "minLength" && (
                <Text>Minimum 3 characters.</Text>
              )
            }
          />
        )}
        name="full_name"
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)}></Button>
    </Card>
  );
};

export default RegisterForm;
