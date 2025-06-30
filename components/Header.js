import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import logo from "../assets/WorkEasyIcon.png";

export default function Header(props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={logo} style={{ width: 35, height: 35 }} />
        <View>
          <Text style={styles.text}>{props.headerDisplay}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#eee",
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
});
