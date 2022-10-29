import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Input from "../components/Input";
import Button from "../UI/Button";
import FlatButton from "../UI/FlatButton";
import { Domain } from "../Domain";
import UserContext from "../context/UserContext";
import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

function LoginForm({ navigation }) {
  const { login } = React.useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [checkTextInput, setCheckTextInput] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const updateEmailHandler = (enterText) => {
    setEmail(enterText);
    if (enterText.length !== 0) {
      setCheckTextInput(true);
    } else {
      setCheckTextInput(false);
    }
    // console.log(enterText);
  };

  const updateSecureTextEntry = () => {
    setSecureTextEntry((previous) => !previous);
  };

  const updatePasswordHandler = (enterText) => {
    setPassord(enterText);
  };

  const swtichScreenHandler = () => {
    navigation.navigate("Signup");
  };

  const loginUser = () => {
    const user = { email, password };
    // console.log(user);
    fetch(`${Domain}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((respo) => respo.json())
      .then((res) => {
        const id = res.id;
        const email = res.email;
        const token = res.acessToken;
        if (res.status === "200") {
          login(email, id, token);
        }
        // console.log(res.acessToken);
        console.log(res);
      });
  };

  return (
    // <View style={styles.authContent}>
    //   <View>
    //     <Input
    //       label="Email Address"
    //       onUpdateValue={updateEmailHandler}
    //       //  onUpdateValue={updateInputValueHandler.bind(this, 'email')}
    //       //  value={enteredEmail}
    //       keyboardType="email-address"
    //       //  isInvalid={emailIsInvalid}
    //     />
    //     <Input label="Password" onUpdateValue={updatePasswordHandler} />
    //     <View style={styles.buttons}>
    //       <Button onPress={loginUser}>Log In</Button>
    //     </View>
    //     <View style={styles.buttons}>
    //       <FlatButton onPress={swtichScreenHandler}>
    //         Create a new user
    //       </FlatButton>
    //     </View>
    //   </View>
    // </View>

    <View style={styletubes.container}>
      <View style={styletubes.header}>
        <Text style={styletubes.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styletubes.footer}>
        <Text style={styletubes.text_footer}>Email</Text>
        <View style={styletubes.action}>
          <Ionicons name="person-outline" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styletubes.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={updateEmailHandler}
          />
          {checkTextInput ? (
            <Animatable.View animation="bounceIn">
              <Ionicons name="checkmark-done-circle-outline" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styletubes.text_footer, { marginTop: 35 }]}>
          Password
        </Text>
        <View style={styletubes.action}>
          <Ionicons name="lock-closed-outline" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={secureTextEntry ? true : false}
            style={styletubes.textInput}
            onChangeText={updatePasswordHandler}
            autoCapitalize="none"
            // keyboardType="pa"
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {secureTextEntry ? (
              <Ionicons name="eye-off-outline" size={20} />
            ) : (
              <Ionicons name="eye-outline" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styletubes.button}>
          <TouchableOpacity style={styletubes.signIn} onPress={loginUser}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styletubes.signIn}
            >
              <Text style={[styletubes.textSign, { color: "#fff" }]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={swtichScreenHandler}
            style={[
              styletubes.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text
              style={[
                styletubes.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              {" "}
              Sign Up{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#610440",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 12,
  },
});

const styletubes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
