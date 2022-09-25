import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, Text, Avatar, Button } from "@rneui/themed";
import FullSizeImage from "../components/FullSizeImage";
import FullSizeVideo from "../components/FullSizeVideo";
import PropTypes from "prop-types";
import { baseUrl } from "../utils/config";
import { useTag, useUser, useFavorite } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Single = ({ route }) => {
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
      if (avatar) uploader.avatar = `${baseUrl}/uploads/${avatar.filename}`;
      setUploader(uploader);
    } catch (error) {
      console.log("getUploader():", error.message);
    }
  };

  const getFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const favorites = await getFavoritesById(token, singleMedia.file_id);
      setFavorites(favorites);
    } catch (error) {
      console.log("getFavorites():", error.message);
    }
  };

  const like = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await addFavorite(token, singleMedia.file_id);
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
            {uploader.avatar ? (
              <Avatar source={{ uri: uploader.avatar }} />
            ) : null}
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
                <ListItem key={f.user_id}>
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
