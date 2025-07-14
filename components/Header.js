import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import logo from "../assets/WorkEasyIcon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../RootNavigation";
import { CommonActions } from "@react-navigation/native";

export default function Header(props) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          navigationRef.current?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={logo} style={{ width: 35, height: 35 }} />
        <View>
          <Text style={styles.text}>{props.headerDisplay}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#eee",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "OpenSans",
  },
  logoutButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#f44336",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
