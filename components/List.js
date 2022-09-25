import { ActivityIndicator, FlatList } from "react-native";
import ListItem from "./ListItem";
import { useMedia } from "../hooks/ApiHooks";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const List = ({ navigation, userId }) => {
  const { update, loading } = useContext(MainContext);
  const { mediaArray, deleteMedia } = useMedia(update, userId);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          deleteMedia={deleteMedia}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  userId: PropTypes.number,
};

export default List;
