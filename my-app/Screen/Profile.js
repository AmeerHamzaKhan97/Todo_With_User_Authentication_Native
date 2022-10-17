import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import OutLinedButton from "../UI/OutLinedButton";
import UserContext from "../context/UserContext";
import { Domain } from "../Domain";
import Button from "../UI/Button";

function Profile({ navigation }) {
  const { user, logout } = React.useContext(UserContext);
  const userId = user.id;
  const [userData, setUserData] = useState([]);
  const editscreenhandler = () => {
    navigation.navigate("EditProfile", {
      userId: userId,
    });
  };

  // console.log(userId);

  useEffect(() => {
    function fetchUserProfile() {
      fetch(`${Domain}/api/v1/getprofile/${userId}`, {
        method: "GET",
      })
        .then((respo) => respo.json())
        .then((res) => {
          setUserData(res);
          // console.log(res);
        });
    }
    fetchUserProfile();
  }, [userId]);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.imagePreview}>
          <Image
            style={styles.image}
            source={{ uri: userData[0]?.profile_picture_path }}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Full Name</Text>
        <Text style={styles.subtitle}>
          {userData[0]?.first_name + userData[0]?.last_name}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Number</Text>
        <Text style={styles.subtitle}>{userData[0]?.phone_number}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.subtitle}>{userData[0]?.email}</Text>
      </View>
      <OutLinedButton
        futurestyle={styles.buttonstyle}
        icon="create-outline"
        onPress={editscreenhandler}
      >
        Edit Profile
      </OutLinedButton>
      <OutLinedButton
        futurestyle={styles.buttonstyle}
        icon="log-out-outline"
        onPress={logout}
      >
        Logout
      </OutLinedButton>
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 4,
  },
  mainContainer: {
    alignItems: "center",
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    // padding: 100,
    // maxHeight: 800,
    // backgroundColor: "#bbc0c9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
  },
  buttonstyle: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
