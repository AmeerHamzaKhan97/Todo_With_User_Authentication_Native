import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Domain } from "../Domain";

function TdoList({ _id, task }) {
  // console.log(task, _id);
  const navigation = useNavigation();
  const updatetaskhandler = () => {
    navigation.navigate("AddTodo", {
      taskId: _id,
    });
  };
  const deleteTaskHandler = () => {
    console.log(_id, "id");
    fetch(`${Domain}/api/v1/deletetask/${_id}`, {
      method: "DELETE",
    })
      .then((respo) => respo.json())
      .then((res) => {
        console.log(res, "delete");
        Alert.alert("Task Deleted", "Please refresh the screen");
      });
  };
  return (
    <Pressable onPress={updatetaskhandler}>
      <View style={styles.container}>
        <Text style={styles.task}>{task}</Text>
        <Pressable onPress={deleteTaskHandler}>
          <Ionicons name="trash-outline" size={20} />
        </Pressable>
      </View>
    </Pressable>
  );
}

export default TdoList;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "#E7E9EB",
    // paddingHorizontal: 12,
    // paddingVertical: 10,
    // margin: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  task: {
    fontWeight: "600",
    fontSize: 20,
    // textAlign: "center",
  },
});
