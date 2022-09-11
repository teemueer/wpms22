import PropTypes from "prop-types";
import { baseUrl } from "../utils/config";
import { ListItem as NBListItem, Avatar } from "@rneui/themed";

const ListItem = ({ navigation, singleMedia }) => {
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
      </NBListItem.Content>
      <NBListItem.Chevron />
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
