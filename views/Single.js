import React from "react";
import { StyleSheet, SafeAreaView, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { baseUrl } from "../hooks/ApiHooks";

const Single = ({ route }) => {
  const { singleMedia } = route.params;
  console.log(singleMedia);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{singleMedia.title}</Text>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{
          uri: `${baseUrl}/uploads/${singleMedia.filename}`,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
