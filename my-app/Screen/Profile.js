import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import OutLinedButton from "../UI/OutLinedButton";
import UserContext from "../context/UserContext";
import { Domain } from "../Domain";
import Button from "../UI/Button";
import { Ionicons } from "@expo/vector-icons";

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
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../image/profile_bg.png")}
            resizeMode="cover"
            style={styles.coverimage}
          />
          {/* <Text>header</Text> */}
        </View>
        <View style={styles.footer}>
          <View style={styles.profile_container}>
            <View style={styles.imagePreview}>
              <Ionicons name="camera-outline" size={100} />
            </View>
          </View>
          <Text>Footer</Text>
        </View>
      </View>
      {/* <View style={styles.mainContainer}>
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
      </OutLinedButton> */}
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  imagePreview: {
    // width: "20%",
    // height: 100,
    width: 150,
    height: 150,
    // marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbc0c9",
    borderRadius: 100,
    marginTop: -100,
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

  container: {
    flex: 1,
    // backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    // justifyContent: "flex-end",
    // paddingHorizontal: 20,
    // paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    // alignItems: "center",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  coverimage: {
    flex: 1,
  },
  profile_container: {
    alignItems: "center",
  },
});
