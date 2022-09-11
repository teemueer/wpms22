import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, ListItem } from "@rneui/themed";
import { MainContext } from "../contexts/MainContext";
import { useTag } from "../hooks/ApiHooks";
import { baseUrl } from "../utils/config";
import FullSizeImage from "../components/FullSizeImage";

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(MainContext);
  const { getFilesByTag } = useTag();
  const [avatar, setAvatar] = useState("http://placekitten.com/640");

  const getAvatar = async () => {
    try {
      const avatar = (await getFilesByTag(`avatar_${user.user_id}`))[0];
      setAvatar(`${baseUrl}/uploads/${avatar.filename}`);
    } catch (error) {
      console.error(error.message);
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

  return (
    <Card>
      <Card.Title h4>
        {user.full_name ? user.full_name : user.username}
      </Card.Title>
      <FullSizeImage source={{ uri: avatar }} />
      <ListItem>
        <Avatar
          icon={{ name: "contact-mail", type: "material" }}
          containerStyle={{ backgroundColor: "#aaa" }}
        />
        <ListItem.Title>{user.email}</ListItem.Title>
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
  );
};

export default Profile;
