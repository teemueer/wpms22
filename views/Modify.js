import { Card, Input, Button, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { useMedia } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import { MainContext } from "../contexts/MainContext";
import { baseUrl } from "../utils/config";
import FullSizeImage from "../components/FullSizeImage";
import FullSizeVideo from "../components/FullSizeVideo";
import { ActivityIndicator } from "react-native";

const Modify = ({ navigation, route }) => {
  const file = route.params;

  const { update, setUpdate, isLoading, setLoading } = useContext(MainContext);
  const { putMedia } = useMedia(update);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: file.title, description: file.description },
    mode: "onBlur",
  });

  const onUpdate = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await putMedia(token, data, file.file_id);
      setTimeout(() => {
        setUpdate(!update);
        navigation.navigate("MyFiles");
      }, 1000);
    } catch (error) {
      console.error("onUpdate()", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {file.media_type === "image" ? (
        <FullSizeImage
          source={{ uri: `${baseUrl}/uploads/${file.filename}` }}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
        <FullSizeVideo
          source={{ uri: `${baseUrl}/uploads/${file.filename}` }}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This field is required." },
          minLength: { value: 3, message: "Minimum 3 characters." },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
            errorMessage={errors.title && <Text>{errors.title.message}</Text>}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
          />
        )}
        name="description"
      />

      <Button
        title="Update"
        loading={isLoading}
        onPress={handleSubmit(onUpdate)}
      />
    </Card>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
