import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Domain } from "../Domain";
import UserContext from "../context/UserContext";
// import { useIsFocused } from "@react-navigation/native";

function AddTodo({ navigation, route }) {
  // if (route.params?.taskId) {
  //   console.log("update it", route.params.taskId);
  // }
  // const isFoucsed = useIsFocused();

  const task = route.params?.taskId;
  const { user } = React.useContext(UserContext);
  const userId = user.id;

  useEffect(() => {
    async function fetchForUpdate() {
      fetch(`${Domain}/api/v1/getbyid/${task}`, {
        method: "GET",
      })
        .then((respo) => respo.json())
        .then((res) => {
          // console.log(res, "update");
          setTextInput(res.task);
        });
    }
    if (task) fetchForUpdate();
  }, [task]);

  const [textInput, setTextInput] = useState("");
  const TaskHandler = (enterText) => {
    // console.log(enterText);
    setTextInput(enterText);
  };

  const saveTask = () => {
    // console.log(category);
    const task = { textInput, userId };
    fetch(`${Domain}/api/v1/addtask`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((respo) => {
        console.log(respo);
        navigation.navigate("Todo List");
      });
  };

  const updateTask = () => {
    console.log("press update");
    fetch(`${Domain}/api/v1/updatetask/${task}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ task: textInput }),
    })
      .then((respo) => respo.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Task"
          onChangeText={TaskHandler}
          value={textInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={route.params?.taskId ? "Update" : "Add"}
          onPress={route.params?.taskId ? updateTask : saveTask}
        />
      </View>
    </View>
  );
}

export default AddTodo;

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    marginTop: 80,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  main: {
    flex: 1,
  },

  textInput: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonContainer: {
    margin: 10,
  },
});
