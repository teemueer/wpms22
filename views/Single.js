import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, Text, Image } from "@rneui/themed";
import FullSizeImage from "../components/FullSizeImage";
import PropTypes from "prop-types";
import { baseUrl } from "../utils/config";

const Single = ({ route }) => {
  const { singleMedia } = route.params;
  console.log(singleMedia);
  return (
    <ScrollView>
      <Card>
        <Card.Title>{singleMedia.title}</Card.Title>
        <Card.Divider />
        <FullSizeImage
          source={{ uri: `${baseUrl}/uploads/${singleMedia.filename}` }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Card.Divider />
        <ListItem>
          <Text>{singleMedia.description}</Text>
          <Text></Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
