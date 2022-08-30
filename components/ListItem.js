import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import { baseUrl } from "../hooks/ApiHooks";

const ListItem = (props) => {
  return (
    <>
      <TouchableOpacity
        style={styles.cat}
        onPress={() => props.navigation.navigate("Single")}
      >
        <Image
          style={styles.thumbnail}
          source={{
            uri: `${baseUrl}/uploads/${props.singleMedia.thumbnails.w160}`,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{props.singleMedia.title}</Text>
          <Text style={styles.description}>
            {props.singleMedia.description}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cat: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    backgroundColor: "#ccc",
    marginBottom: 5,
    padding: 10,
  },
  image: {
    objectFit: "cover",
    width: "100%",
  },
  thumbnail: {
    width: 150,
    height: 200,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    flexShrink: 1,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
