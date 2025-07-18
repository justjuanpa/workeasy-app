import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const tenantId = await AsyncStorage.getItem("tenant_id");

        if (!token || !tenantId) {
          console.error("Missing token or tenant ID");
          return;
        }

        const response = await fetch(
          `https://beta-publicapi.easyworkforce.net/employees?Archived=false&Top=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error:", response.status, errorText);
          return;
        }
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = employees.filter((emp) =>
      `${emp.FirstName} ${emp.LastName}`
        .toLowerCase()
        .includes(text.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleSelect = (employee) => {
    navigation.navigate("EnterPin", { employee });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          To get started, select your name from the list. Then enter your PIN.
        </Text>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredEmployees}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.listText}>
                {item.FirstName} {item.LastName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  listText: {
    fontSize: 18,
  },
});
