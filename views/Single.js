import React, { useContext, useEffect, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, Text, Avatar } from "@rneui/themed";
import FullSizeImage from "../components/FullSizeImage";
import FullSizeVideo from "../components/FullSizeVideo";
import PropTypes from "prop-types";
import { baseUrl } from "../utils/config";
import { useTag, useUser, useFavorite } from "../hooks/ApiHooks";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Logs } from "expo";
import { Button } from "@rneui/base";
Logs.enableExpoCliLogging();

const Single = ({ route }) => {
  const { user } = useContext(MainContext);
  const { singleMedia } = route.params;
  const [uploader, setUploader] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { getFilesByTag } = useTag();
  const { getUserById } = useUser();
  const { getFavoritesById, addFavorite } = useFavorite();

  const getUploader = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const uploader = await getUserById(token, singleMedia.user_id);
      const avatar = (
        await getFilesByTag(`avatar_${singleMedia.user_id}`)
      ).pop();
      uploader.avatar = `${baseUrl}/uploads/${avatar.filename}`;
      setUploader(uploader);
    } catch (error) {
      console.log("getUploader():", error.message);
    }
  };

  const getFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const favorites = await getFavoritesById(token, singleMedia.file_id);
      console.log(favorites);
      setFavorites(favorites);
    } catch (error) {
      console.log("getFavorites():", error.message);
    }
  };

  const like = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await addFavorite(token, singleMedia.file_id);
      console.log(res);
    } catch (error) {
      console.log("like():", error.message);
    }
  };

  useEffect(() => {
    getUploader();
    getFavorites();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title>{singleMedia.title}</Card.Title>
        <Card.Divider />
        {singleMedia.media_type === "image" ? (
          <FullSizeImage
            source={{ uri: `${baseUrl}/uploads/${singleMedia.filename}` }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <FullSizeVideo
            source={{ uri: `${baseUrl}/uploads/${singleMedia.filename}` }}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
        <Card.Divider />
        <ListItem>
          <Text>{singleMedia.description}</Text>
        </ListItem>
        {uploader ? (
          <ListItem>
            <Avatar source={{ uri: uploader.avatar }} />
            <Text>{uploader.username}</Text>
          </ListItem>
        ) : null}
        <ListItem>
          <Button title="Like" onPress={() => like()} />
        </ListItem>
        {favorites ? (
          <>
            <ListItem>
              <Text>Total likes: {favorites.length}</Text>
            </ListItem>
            <ListItem>
              {favorites.map((f) => (
                <ListItem>
                  <Text>{f.username} liked this</Text>
                </ListItem>
              ))}
            </ListItem>
          </>
        ) : null}
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
