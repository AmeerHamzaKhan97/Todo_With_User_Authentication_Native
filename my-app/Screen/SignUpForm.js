import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Input from "../components/Input";
import Button from "../UI/Button";
import FlatButton from "../UI/FlatButton";
import { Domain } from "../Domain";
import UserContext from "../context/UserContext";

function SignUpForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const { user, login } = React.useContext(UserContext);

  const updateEmailHandler = (enterText) => {
    setEmail(enterText);
    // console.log(enterText);
  };

  const updatePasswordHandler = (enterText) => {
    setPassord(enterText);
  };

  const saveUser = () => {
    const user = { email, password };
    console.log(user);
    fetch(`${Domain}/api/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((respo) => respo.json())
      .then((res) => {
        // console.log(res);
        const id = res.id;
        const email = res.email;
        const token = res.acessToken;
        if (res.response === "success") {
          login(email, id, token);
        }
      });
  };
  return (
    <View style={styles.authContent}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateEmailHandler}
          //  onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          //  value={enteredEmail}
          keyboardType="email-address"

          //  isInvalid={emailIsInvalid}
        />
        <Input label="Password" onUpdateValue={updatePasswordHandler} />
        <View style={styles.buttons}>
          <Button onPress={saveUser}>Signup</Button>
        </View>
        <Text>Hello,{user.email}</Text>
        <Text>{user.auth ? "TRUE" : "FALSE"}</Text>
      </View>
    </View>
  );
}

export default SignUpForm;

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
