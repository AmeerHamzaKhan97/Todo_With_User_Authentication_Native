import React, { useState, useEffect } from "react";
import * as imagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import OutLinedButton from "../UI/OutLinedButton";
import Button from "../UI/Button";

function ImagePicker({ onTakeImage, onUpdateProfile }) {
  // let length = onUpdateProfile.length;
  // console.log("updateimage", length);
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // setPickedImagePath(onUpdateProfile);c
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await imagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await imagePicker.launchImageLibraryAsync();

    // Explore the result
    // console.log("picker", result.uri);
    setPickedImagePath(result.uri);
    onTakeImage(result.uri);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await imagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await imagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    // Explore the result
    // console.log(result);
    setPickedImagePath(result.uri);
    onTakeImage(result.uri);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };

  useEffect(() => {
    function setImage() {
      setPickedImagePath(onUpdateProfile);
    }

    if (onUpdateProfile) setImage();
  }, [onUpdateProfile]);

  let imagePreview = <Text>No Image Select yet</Text>;

  if (pickedImagePath) {
    // console.log("path", pickedImagePath);
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImagePath }} />
    );
  }

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.imagePreview}>{imagePreview}</View>
      </View>
      <View style={styles.ButtonContainer}>
        <OutLinedButton icon="camera" onPress={openCamera}>
          Open Camera
        </OutLinedButton>
        <OutLinedButton icon="folder" onPress={showImagePicker}>
          Open Gallery
        </OutLinedButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 8,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
