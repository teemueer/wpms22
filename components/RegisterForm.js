import { Controller, useForm } from "react-hook-form";
import { Input, Button, Text, Card } from "@rneui/themed";
import { useUser } from "../hooks/ApiHooks";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const RegisterForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);

  const {
    control,
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
    <Card>
      <Card.Title>Registeration Form</Card.Title>

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
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
              (errors.username?.type === "required" && (
                <Text>This field is required.</Text>
              )) ||
              (errors.username?.type === "minLength" && (
                <Text>Minimum 3 characters.</Text>
              )) ||
              (errors.username?.type === "validate" && (
                <Text>{errors.username.message}</Text>
              ))
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
            placeholder="email"
            autoCapitalize="none"
            errorMessage={errors.email && <Text>This field is required.</Text>}
          />
        )}
        name="email"
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

      <Controller
        control={control}
        rules={{ required: false, minLength: 3 }}
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
