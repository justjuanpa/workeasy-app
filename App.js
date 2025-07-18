import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { React, useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Header from "./components/Header";
import { navigationRef } from "./RootNavigation";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import EnterPin from "./pages/EnterPin";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const getFreshToken = async () => {
      const clientId = await AsyncStorage.getItem("client_id");
      const clientSecret = await AsyncStorage.getItem("client_secret");
      const tenantId = await AsyncStorage.getItem("tenant_id");

      if (!clientId || !clientSecret || !tenantId) {
        console.warn("Missing saved credentials.");
        setIsLoggedIn(false);
        setAppReady(true);
        return;
      }

      const payload = {
        client_id: clientId,
        client_secret: clientSecret,
        scope:
          "hrp.admin schp.admin cfgp.admin top.admin tap.admin dvp.admin whp.admin",
        grant_type: "client_credentials",
        tenantid: tenantId,
      };

      try {
        const response = await fetch(
          "https://beta-accounts.workeasysoftware.com/connect/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(payload).toString(),
          }
        );

        const data = await response.json();

        if (response.ok && data.access_token) {
          await AsyncStorage.setItem("access_token", data.access_token);
          const expirationTime = Date.now() + data.expires_in * 1000;
          await AsyncStorage.setItem(
            "token_expiration",
            expirationTime.toString()
          );
          setIsLoggedIn(true);
        } else {
          console.warn("Failed to refresh token:", data);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        setIsLoggedIn(false);
      } finally {
        setAppReady(true);
      }
    };

    const checkLoginStatus = async () => {
      const clientId = await AsyncStorage.getItem("client_id");
      const clientSecret = await AsyncStorage.getItem("client_secret");
      const tenantId = await AsyncStorage.getItem("tenant_id");

      if (!clientId || !clientSecret || !tenantId) {
        setIsLoggedIn(false);
        setAppReady(true);
        return;
      }

      const expiration = await AsyncStorage.getItem("token_expiration");
      const token = await AsyncStorage.getItem("access_token");

      if (expiration && token && Date.now() < Number(expiration)) {
        setIsLoggedIn(true);
        setAppReady(true);
      } else {
        await getFreshToken();
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!appReady) {
        console.warn(
          "Splash screen timeout fallback triggered. Forcing appReady = true."
        );
        setAppReady(true);
      }
    }, 5000);

    return () => clearTimeout(fallback);
  });

  let [fontsLoaded] = useFonts({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appReady]);

  if (!fontsLoaded || !appReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "EmployeeList" : "Login"}
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
            name="EmployeeList"
            component={EmployeeList}
            options={{
              header: () => <Header headerDisplay="Employee List" />,
            }}
          />
          <Stack.Screen
            name="EnterPin"
            component={EnterPin}
            options={{ header: () => <Header headerDisplay="Enter Pin" /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
