import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EnterPin({ route, navigation }) {
  const { employee } = route.params;
  const [pin, setPin] = useState("");

  const handlePinPress = (digit) => {
    if (pin.length < 6) setPin(pin + digit);
  };

  const handleClear = () => setPin("");
  const handleBackspace = () => setPin(pin.slice(0, -1));

  const handleSubmit = () => {
    // add real PIN verification here
    console.log(`PIN entered for ${employee.FirstName}: ${pin}`);
    alert(`PIN entered: ${pin}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}> Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Hi {employee.FirstName}!</Text>
        <Text>Please enter your pin.</Text>

        <TextInput
          style={styles.input}
          value={pin}
          secureTextEntry
          editable={false}
        />

        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.key}
              onPress={() => handlePinPress(num.toString())}
            >
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.key} onPress={handleClear}>
            <Text style={styles.keyText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handlePinPress("0")}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.key} onPress={handleBackspace}>
            <MaterialIcons name="backspace" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.okButton} onPress={handleSubmit}>
          <Text style={styles.okText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 24,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    width: 200,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  key: {
    width: "30%",
    padding: 15,
    margin: 5,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    borderRadius: 5,
  },
  keyText: { fontSize: 20 },
  okButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: 200,
  },
  okText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
