import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import TdoList from "../components/TdoList";
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
  const isFoucsed = useIsFocused();
  const [refreshing, setRefreshing] = useState(true);
  const { user } = React.useContext(UserContext);

  const userId = user.id;

  const [task, setTask] = useState([]);
  useEffect(() => {
    // function fetchTask() {
    //   fetch(`${Domain}/api/v1/alltask`, {
    //     method: "GET",
    //   })
    //     .then((respo) => respo.json())
    //     .then((res) => {
    //       // console.log("homepage", res);
    //       setTask(res);
    //     });
    // }
    if (isFoucsed) loadData();
  }, [isFoucsed]);

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

  return (
    <View>
      {/* {refreshing ? <ActivityIndicator /> : null} */}
      <FlatList
        data={task}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      />
    </View>
  );
}

export default AllTodo;
