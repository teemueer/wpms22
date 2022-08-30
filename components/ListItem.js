import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";

const ListItem = (props) => {
  return (
    <TouchableOpacity style={style.container}>
      <Image
        style={style.thumbnail}
        resizeMode="cover"
        source={{ uri: props.singleMedia.thumbnails.w160 }}
      />
      <View style={style.details}>
        <Text style={style.title}>{props.singleMedia.title}</Text>
        <Text style={style.description} numberOfLines={6}>
          {props.singleMedia.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 150,
    marginBottom: 10,
    backgroundColor: "#a4e6a2",
    padding: 5,
  },
  thumbnail: {
    flex: 1,
    marginRight: 5,
    borderBottomLeftRadius: 20,
  },
  details: {
    flex: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
  },
  description: {
    color: "#292028",
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
