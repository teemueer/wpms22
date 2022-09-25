import { View } from "react-native";
import PropTypes from "prop-types";
import List from "../components/List";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const MyFiles = ({ navigation }) => {
  const { user } = useContext(MainContext);

  return (
    <View>
      <List navigation={navigation} userId={user.user_id} />
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
