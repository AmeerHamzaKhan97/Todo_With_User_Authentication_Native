import React, { useEffect, useState } from "react";
// import * as imagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import OutLinedButton from "../UI/OutLinedButton";
import UserContext from "../context/UserContext";
import { Domain } from "../Domain";
import Button from "../UI/Button";
import { Ionicons } from "@expo/vector-icons";
// import ImagePicker from "../components/ImagePicker";
import { useIsFocused } from "@react-navigation/native";

function Profile({ navigation }) {
  const { user, logout } = React.useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState("");
  const isFoucsed = useIsFocused();

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
    if (isFoucsed) {
      fetchUserProfile();
    }
  }, [userId]);

  let imagePreview = <Ionicons name="camera-outline" size={100} />;

  if (userData) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{
          uri: userData[0]?.profile_picture_path,
        }}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Photo!</Text>
              <TouchableOpacity onPress={openCamera}>
                <Text style={styles.cameraText}>Take Photo Camera</Text>
              </TouchableOpacity>
              <Text style={styles.galleryText}>Take Photo Gallery</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Button onPress={() => setModalVisible(!modalVisible)}>
                  Cancel
                </Button>
              </Pressable>
            </View>
          </View>
        </Modal> */}

        <View style={styles.header}>
          <ImageBackground
            source={require("../image/profile_bg.png")}
            resizeMode="cover"
            style={styles.coverimage}
          />
        </View>
        <View style={styles.footer}>
          {/* <Pressable onPress={() => setModalVisible(true)}> */}
          <View style={styles.profile_container}>
            <View style={styles.imagePreview}>
              {/* <Ionicons name="camera-outline" size={100} /> */}
              {imagePreview}
            </View>
          </View>
          {/* </Pressable> */}
          <View style={styles.username}>
            <Text style={styles.username_text}>
              {" "}
              {`${userData[0]?.first_name} ${userData[0]?.last_name}`}
            </Text>
          </View>
          <View style={styles.detailcontainer}>
            <View style={styles.emailcontainer}>
              <Ionicons name="mail-outline" size={30} />
              <Text style={styles.detailtext}>{userData[0]?.email}</Text>
            </View>

            <View style={styles.emailcontainer}>
              <Ionicons name="call-outline" size={30} />
              <Text style={styles.detailtext}>{userData[0]?.phone_number}</Text>
            </View>
          </View>
          <View>
            <Button onPress={editscreenhandler}>Edit Profile</Button>
          </View>
          <View style={styles.logoutButton}>
            <Button logoutStyle={styles.logoutButtonStyle} onPress={logout}>
              Logout
            </Button>
          </View>
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
    width: 200,
    height: 200,
    // marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbc0c9",
    borderRadius: 100,
    marginTop: -130,
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
    width: "110%",
    height: "110%",
    borderRadius: 200,
  },

  container: {
    flex: 1,
    // backgroundColor: "#009387",
  },
  header: {
    // flex: 1,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  profile_container: {
    alignItems: "center",
  },
  modalText: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 15,
  },
  cameraText: {
    fontSize: 20,
    fontWeight: "500",

    marginLeft: 15,
    marginBottom: 30,
  },
  galleryText: {
    fontSize: 20,
    fontWeight: "500",

    marginLeft: 15,
    marginBottom: 30,
  },
  username: {
    alignItems: "center",
    marginTop: 10,
  },
  username_text: {
    fontSize: 40,
    fontWeight: "500",
  },
  emailcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  detailcontainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },

  detailtext: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutButtonStyle: {
    backgroundColor: "#C21E56",
  },
});
