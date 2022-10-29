import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllTodo from "./Screen/AllTodo";
import Profile from "./Screen/Profile";
import AddTodo from "./Screen/AddTodo";
import IconButton from "./UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Button, Text, View } from "react-native";
import EditProfile from "./Screen/EditProfile";
import LoginForm from "./Screen/LoginForm";
import SignUpForm from "./Screen/SignUpForm";
import UserProvider from "./context/UserState";
import UserContext from "./context/UserContext";
import { Domain } from "./Domain";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="add"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("AddTodo");
              }}
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerShown: false,
        })}
        name="Todo List"
        component={AllTodo}
      />
      <Bottom.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        })}
        name="Profile"
        component={Profile}
      />
    </Bottom.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginForm} />
      <Stack.Screen name="Signup" component={SignUpForm} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { user } = React.useContext(UserContext);
  console.log(user);
  return (
    <NavigationContainer>
      {user.auth && <AuthStack />}
      {!user.auth && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const { user, login } = React.useContext(UserContext);
  // const navigation = useNavigation();

  useEffect(() => {
    async function fetchToken() {
      // console.log("appuseeffct", { user });
      if (!(user.email && user.id)) {
        const storedToken = await AsyncStorage.getItem("token");
        // console.log(storedToken);
        if (!storedToken) {
          // console.log("not jwt", jwt);
        } else {
          // console.log("fetching jwt");
          fetch(`${Domain}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
            .then((respo) => {
              if (!respo.ok) {
                // console.log("resp not okk");
              } else {
                return respo.json();
              }
            })

            .then((res) => {
              // console.log(res, "11");
              const userEmail = res.user.email;
              const userId = res.user.id;
              // console.log(userEmail, userId, storedToken);
              login(userEmail, userId, storedToken);
            })
            .catch(() => {
              console.log("fetch catch");
              // navigation.navigate("login");
            });
        }
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <ActivityIndicator />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <UserProvider>
        {/* <Navigation /> */}
        <Root />
      </UserProvider>
    </>
  );
}
