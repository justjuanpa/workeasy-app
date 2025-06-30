import React, { useState } from "react";
import workEasyCatalog from "../CatalogDB";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from "react-native";

export default function CatalogDetail({ route, navigation }) {
  const [catalogData, setCatalogData] = useState(workEasyCatalog);
  const { id } = route.params;
  const selectedProduct = catalogData.find((post) => post.modelNumber === id);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttontext}>Go Back</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.model}>{selectedProduct.model}</Text>
        <Image style={styles.productimage} source={selectedProduct.image} />
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Quote", {
            model: selectedProduct.model,
            modelNumber: selectedProduct.modelNumber,
          })
        }
      >
        <Text style={styles.buttontext}>Submit Quote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 100,
  },
  button: {
    padding: 20,
  },
  buttontext: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  model: {
    fontFamily: "OpenSans",
    paddingBottom: 15,
  },
  productimage: {
    height: 250,
    width: "100%",
  },
  description: {
    paddingTop: 10,
  },
});
