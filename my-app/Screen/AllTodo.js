import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import TdoList from "../components/TdoList";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { Domain } from "../Domain";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../context/UserContext";

const DUMMY_DATA = [
  {
    id: 1,
    task: "buy mobile",
  },
  {
    id: 2,
    task: "complete a book",
  },
  {
    id: 3,
    task: "learn programming",
  },
];

const renderTodoItem = (itemData) => {
  // console.log(itemData);
  return <TdoList {...itemData.item} />;
};

function AllTodo() {
  const [textInput, setTextInput] = useState("");
  const [isTaskSave, setIsTaskSave] = useState(true);
  const isFoucsed = useIsFocused();
  const [refreshing, setRefreshing] = useState(true);
  const { user } = React.useContext(UserContext);

  const userId = user.id;

  const TaskHandler = (enterText) => {
    // console.log(enterText);
    setTextInput(enterText);
  };

  const [task, setTask] = useState([]);
  useEffect(() => {
    // if (isFoucsed) loadData();
    loadData();
  }, [isTaskSave]);

  const loadData = () => {
    fetch(`${Domain}/api/v1/taskbyid/${userId}`, {
      method: "GET",
    })
      .then((respo) => respo.json())
      .then((res) => {
        setRefreshing(false);
        // console.log("homepage", res);
        setTask(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveTask = () => {
    // console.log(category);
    const task = { textInput, userId };
    // console.log(task);
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
        setTextInput("");
        setIsTaskSave((laststate) => !laststate);

        // navigation.navigate("Todo List");
      });
  };

  return (
    // <View>
    //   {/* {refreshing ? <ActivityIndicator /> : null} */}
    //   <FlatList
    //     data={task}
    //     renderItem={renderTodoItem}
    //     keyExtractor={(item) => item._id}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={loadData} />
    //     }
    //   />
    // </View>

    <View style={styletubes.container}>
      <View style={styletubes.header}>
        <Text style={styletubes.text_header}>Hello User</Text>
        <Text style={styletubes.text_sub}>What are to doing today?</Text>
        <View style={styletubes.action}>
          <Pressable onPress={saveTask}>
            <Ionicons
              name="add-outline"
              size={22}
              style={styletubes.iconstyle}
              // onPress={() => console.log("click")}
            />
          </Pressable>
          <TextInput
            style={styletubes.textInput}
            placeholder="Add Task"
            onChangeText={TaskHandler}
            // onChangeText={TaskHandler}
            value={textInput}
          />
        </View>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styletubes.footer}>
        <View style={styletubes.todo_text_container}>
          <Text style={styletubes.text_todo}>Your To-do List:</Text>
        </View>
        {task.length === 0 ? (
          <View style={styletubes.emptytodo}>
            <Image
              style={styletubes.image}
              source={require("../image/todo_empty_white.png")}
            />
            <Text style={styletubes.text_empty}>
              Oops! You don't have any to do list{" "}
            </Text>
          </View>
        ) : (
          <FlatList
            data={task}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadData} />
            }
          />
        )}
      </Animatable.View>
    </View>
  );
}

export default AllTodo;

const styletubes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    backgroundColor: "#009387",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 50,

    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  footer: {
    flex: 2,
    backgroundColor: "#fff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconstyle: {
    fontWeight: "100",
  },
  // action: {
  //   flexDirection: "row",
  //   marginTop: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#f2f2f2",
  //   paddingBottom: 5,
  // },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 10,
  },
  emptytodo: {
    // marginHorizontal: 100,
    marginVertical: 40,
  },
  text_empty: {
    fontSize: 20,
    marginHorizontal: 30,
  },
  text_sub: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 20,
  },
  todo_text_container: {
    marginTop: -50,
  },
  text_todo: {
    color: "#fff",
    fontWeight: "bold",
  },
  text_list: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row-reverse",

    // marginTop: 10,
    // borderWidth: 1,
    backgroundColor: "#fff",
    // borderBottomColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -4,
    paddingLeft: 10,
    color: "#637381",
    fontSize: 16,
  },
  image: {
    height: 300,
    width: 300,
    marginHorizontal: 20,
  },
});
