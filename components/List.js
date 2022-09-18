import { ActivityIndicator, FlatList } from "react-native";
import ListItem from "./ListItem";
import { useMedia } from "../hooks/ApiHooks";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const List = ({ navigation }) => {
  const { update, loading, setLoading } = useContext(MainContext);
  const { mediaArray } = useMedia(update, setLoading);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
