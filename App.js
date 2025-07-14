import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { React, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./pages/Home";
import { Platform, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { navigationRef } from "./RootNavigation";
import NewsDetail from "./pages/NewsDetail";
import AboutWorkEasy from "./pages/About";
import Quotepage from "./pages/Quote";
import Catalogpage from "./pages/Catalog";
import CatalogDetail from "./pages/CatalogDetail";
import Login from "./pages/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  let [fontsLoaded] = useFonts({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (isLoggedIn === null || !fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "WorkEasy" : "Login"}
            headerMode="screen"
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="WorkEasy"
              component={Homepage}
              options={{
                header: () => <Header headerDisplay="WorkEasy" />,
              }}
            />
            <Stack.Screen
              name="NewsDetail"
              component={NewsDetail}
              options={{
                header: () => <Header headerDisplay="News" />,
              }}
            />
            <Stack.Screen
              name="About"
              component={AboutWorkEasy}
              options={{
                header: () => (
                  <Header headerDisplay="About WorkEasy Software" />
                ),
              }}
            />
            <Stack.Screen
              name="Quote"
              component={Quotepage}
              options={{
                header: () => <Header headerDisplay="Get a quote" />,
              }}
            />
            <Stack.Screen
              name="Catalog"
              component={Catalogpage}
              options={{
                header: () => (
                  <Header headerDisplay="WorkEasy Software Robotics" />
                ),
              }}
            />
            <Stack.Screen
              name="CatalogDetail"
              component={CatalogDetail}
              options={{
                header: () => <Header headerDisplay="Product Information" />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
