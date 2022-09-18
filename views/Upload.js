import { Card, Input, Button, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useContext, useState } from "react";
import { useMedia, useTag } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import { MainContext } from "../contexts/MainContext";
import { useFocusEffect } from "@react-navigation/native";
import { myTag } from "../utils/config";

const Upload = ({ navigation }) => {
  const { update, setUpdate, setLoading } = useContext(MainContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { postMedia } = useMedia(update, setLoading);
  const { postTag } = useTag();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: "", description: "" },
    mode: "onBlur",
  });

  const onSelect = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.cancelled) {
      setImage(res);
    }
  };

  const onReset = () => {
    setImage(null);
    setValue("title", "");
    setValue("description", "");
  };

  useFocusEffect(
    useCallback(() => {
      console.log("usefocus");
      onReset();
    }, [navigation])
  );

  const onUpload = async (data) => {
    const ext = image.uri.split(".").pop();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: `${image.type}/${ext === "jpg" ? "jpeg" : ext}`,
    });

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");

      let res = await postMedia(token, formData);
      console.log(res);

      res = await postTag(token, { file_id: res.file_id, tag: myTag });
      console.log(res);

      setTimeout(() => {
        setUpdate(!update);
        onReset();
        navigation.navigate("Home");
      }, 1000);
    } catch (error) {
      console.error("onUpload()", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {image ? <Card.Image source={{ uri: image.uri }} /> : null}

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

      <Button title="Select file" onPress={onSelect} />
      <Button title="Reset" onPress={onReset} />
      <Button
        title="Upload file"
        disabled={!image || !isValid}
        onPress={handleSubmit(onUpload)}
        loading={uploading}
      />
    </Card>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
