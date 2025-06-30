import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import imageA from "../assets/WorkEasyTimeClocks.png";
import imageB from "../assets/WorkEasyPreview.png";
import imageC from "../assets/WorkEasyPreview2.png";

const blockA = `
    This right here is some dummy text. Once the actual text is supplied this will be replaced. in the meantime i am leaving this here. 
    i want to make this a little bit longer so i am going to keep typing this out for a bit until i am satisfied with the length of this 
    portion. okay i think this is good now
`;

const blockB = `
    This right here is the second some dummy text portion. Once the actual text is supplied this will be replaced. in the meantime i 
    am leaving this here. i want to make this a little bit longer so i am going to keep typing this out for a bit until i am \
    satisfied with the length of this portion. okay i think this is good now
`;

export default function AboutWorkEasy() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={imageA}
          style={{ width: "100%", height: 300 }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>We Deliver Remarkable!</Text>
        <Text style={styles.text}>{blockA}</Text>
        <Image
          source={imageC}
          style={{ width: "100%", height: 300 }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>
          Complete employee scheduling in minutes
        </Text>
        <Text style={styles.text}>{blockB}</Text>
        <Image
          source={imageB}
          style={{ width: "100%", height: 400 }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>
          Cover Every Angle of Time and Attendance — Easily
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    padding: 5,
  },
  text: {
    fontFamily: "OpenSans",
    padding: 5,
  },
});
