import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { useMedia } from "../hooks/ApiHooks";
import PropTypes from "prop-types";

const List = (props) => {
  const { mediaArray } = useMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem navigation={props.navigation} singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
