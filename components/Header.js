import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Settings } from "react-native-feather";

const Header = () => {
  return (
    <View>
      <ImageBackground
        source={require("../assets/header.jpg")}
        resizeMode="cover"
        style={style.image}
        imageStyle={style.cat}
      />
      <Text style={style.text}>Cat Application</Text>
      <Settings style={style.icon} width={40} height={40} />
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  cat: {
    borderBottomRightRadius: 50,
  },
  text: {
    fontSize: 20,
    color: "#a87e7e",
    backgroundColor: "#91ff00d8",
    position: "absolute",
    bottom: 10,
    padding: 10,
  },
  icon: {
    top: 10,
    right: 10,
    position: "absolute",
    color: "#010101bb",
  },
});

export default Header;
