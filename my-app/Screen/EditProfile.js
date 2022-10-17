import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from "../components/ImagePicker";
import { Domain } from "../Domain";
import OutLinedButton from "../UI/OutLinedButton";
import UserContext from "../context/UserContext";

function EditProfile({ route }) {
  const updateUserId = route.params?.userId;
  // console.log(updateUserId.length);
  const { user } = React.useContext(UserContext);
  const id = user.id;
  const [selectedImage, setSelectedImage] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const takeImagehandler = (imageUri) => {
    setSelectedImage(imageUri);
    // console.log(imageUri, "profile");
  };

  // const sendText = ()=>{

  // }
  const firstNameHandler = (enterText) => {
    setFirstName(enterText);
  };
  const lastNameHandler = (enterText) => {
    setLastName(enterText);
  };
  const numberHandler = (enterText) => {
    setNumber(enterText);
  };
  const emailHandler = (enterText) => {
    setEmail(enterText);
  };

  useEffect(() => {
    function fetchUserById() {
      fetch(`${Domain}/api/v1/getprofile/${updateUserId}`, {
        method: "GET",
      })
        .then((respo) => respo.json())
        .then((res) => {
          // console.log("updateEdit", res);
          if (res.length !== 0) {
            setSelectedImage(res[0].profile_picture_path);
            setFirstName(res[0].first_name);
            setLastName(res[0].last_name);
            setNumber(res[0].phone_number);
            setEmail(res[0].email);
          }
        });
    }
    if (updateUserId) fetchUserById();
  }, [updateUserId]);

  const saveProfile = async () => {
    console.log("press");
    const formData = new FormData();
    formData.append("profileImagePath", selectedImage);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("user_id", id);

    // console.log(formData);
    await fetch(`${Domain}/api/v1/saveprofile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((respo) => respo.json())
      .then((res) => {
        console.log(res);
      });
  };

  const updateProfile = async () => {
    console.log("update");
    const formData = new FormData();
    formData.append("profileImagePath", selectedImage);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("user_id", updateUserId);

    console.log(formData);
    await fetch(`${Domain}/api/v1/updateprofile/${updateUserId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((respo) => respo.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <ScrollView>
      <ImagePicker
        onTakeImage={takeImagehandler}
        onUpdateProfile={selectedImage}
      />
      <View style={styles.textContainer}>
        <Text>First Name</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={firstNameHandler}
          value={firstName}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>Last Name</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={lastNameHandler}
          value={lastName}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>Number</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.textinput}
          onChangeText={numberHandler}
          value={number}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>Email</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.textinput}
          onChangeText={emailHandler}
          value={email}
        />
      </View>
      <OutLinedButton
        futurestyle={styles.buttonstyle}
        icon="save-outline"
        onPress={updateUserId ? updateProfile : saveProfile}
      >
        {updateUserId ? "Update" : "Save"}
      </OutLinedButton>
    </ScrollView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  textinput: {
    borderBottomWidth: 1,
    // marginHorizontal: 20,
    // marginTop: 50,
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonstyle: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
