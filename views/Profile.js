import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, ListItem, Text, Input } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { MainContext } from "../contexts/MainContext";
import { useTag, useUser } from "../hooks/ApiHooks";
import { baseUrl } from "../utils/config";
import FullSizeImage from "../components/FullSizeImage";

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(MainContext);
  const { getFilesByTag } = useTag();
  const { putUser } = useUser();
  const [avatar, setAvatar] = useState("http://placekitten.com/640");
  const [email, setEmail] = useState(user.email);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const getAvatar = async () => {
    try {
      const avatar = (await getFilesByTag(`avatar_${user.user_id}`))[0];
      if (avatar) {
        setAvatar(`${baseUrl}/uploads/${avatar.filename}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
    },
    mode: "onBlur",
  });

  const changeEmail = async (data) => {
    try {
      console.log(data);
      await putUser(data);
      setEmail(data.email);
      setShowEmailInput(false);
    } catch (error) {
      console.error("changeEmail():", error);
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

  return !showEmailInput ? (
    <Card>
      <Card.Title h4>
        {user?.full_name ? user.full_name : user.username}
      </Card.Title>
      <FullSizeImage source={{ uri: avatar }} />
      <ListItem>
        <Avatar
          icon={{ name: "contact-mail", type: "material" }}
          containerStyle={{ backgroundColor: "#aaa" }}
        />
        <ListItem.Title onPress={() => setShowEmailInput(true)}>
          {email}
        </ListItem.Title>
      </ListItem>
      <ListItem>
        <Avatar
          icon={{ name: "person", type: "material" }}
          containerStyle={{ backgroundColor: "#aaa" }}
        />
        <ListItem.Title>
          {user.username} (id: {user.user_id})
        </ListItem.Title>
      </ListItem>
      <Button title="Logout" onPress={logout} />
    </Card>
  ) : (
    <Card>
      <Card.Title>Change Email</Card.Title>
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
            placeholder={email}
            autoCapitalize="none"
            errorMessage={errors.email && <Text>{errors.email.message}</Text>}
          />
        )}
        name="email"
      />
      <ListItem>
        <Button title="Change" onPress={handleSubmit(changeEmail)} />
        <Button title="Cancel" onPress={() => setShowEmailInput(false)} />
      </ListItem>
    </Card>
  );
};

export default Profile;
