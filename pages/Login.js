import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../RootNavigation";

export default function Login() {
  const [tenantId, setTenantId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!tenantId || !clientId || !clientSecret) {
      Alert.alert("Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        client_id: clientId,
        client_secret: clientSecret,
        scope:
          "hrp.admin schp.admin cfgp.admin top.admin tap.admin dvp.admin whp.admin",
        grant_type: "client_credentials",
        tenantid: tenantId,
      };

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
        // Save token locally
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("tenant_id", tenantId);
        navigationRef.current?.navigate("WorkEasy");
      } else {
        Alert.alert(
          "Login failed",
          data.error_description || "Invalid credentials or missing fields."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require("../assets/WorkEasyIcon.png")} // replace with your real logo path
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Tenant ID"
                value={tenantId}
                onChangeText={setTenantId}
              />
              <TextInput
                style={styles.input}
                placeholder="Client ID"
                value={clientId}
                onChangeText={setClientId}
              />
              <TextInput
                style={styles.input}
                placeholder="Client Secret"
                value={clientSecret}
                onChangeText={setClientSecret}
                secureTextEntry
              />

              {loading ? (
                <ActivityIndicator size="large" color="#1a2c3b" />
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf3f7",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#edf3f7",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#d5d9e7",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
