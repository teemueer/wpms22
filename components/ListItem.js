import PropTypes from "prop-types";
import { baseUrl } from "../utils/config";
import { ListItem as NBListItem, Avatar, Button } from "@rneui/themed";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListItem = ({ navigation, singleMedia, deleteMedia }) => {
  const { user, update, setUpdate } = useContext(MainContext);

  const onDelete = () => {
    console.log("hurr");
    Alert.alert("Deleting file", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const token = await AsyncStorage.getItem("userToken");
          await deleteMedia(token, singleMedia.file_id);
          setUpdate(!update);
        },
      },
    ]);
  };

  return (
    <NBListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("Single", { singleMedia });
      }}
    >
      <Avatar
        size="large"
        source={{ uri: `${baseUrl}/uploads/${singleMedia.thumbnails.w160}` }}
      />
      <NBListItem.Content>
        <NBListItem.Title h4 numberOfLines={1}>
          {singleMedia.title}
        </NBListItem.Title>
        <NBListItem.Subtitle numberOfLines={2}>
          {singleMedia.description}
        </NBListItem.Subtitle>
        {singleMedia.user_id === user.user_id && (
          <NBListItem>
            <Button title="Delete" onPress={onDelete} />
            <Button
              title="Modify"
              onPress={() => navigation.navigate("Modify", singleMedia)}
            />
          </NBListItem>
        )}
      </NBListItem.Content>
      <NBListItem.Chevron />
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  userId: PropTypes.number,
};

export default ListItem;
