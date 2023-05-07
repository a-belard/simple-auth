import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { roles } from "../../data/roles";

export const ProtectedScreen = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const decoded = jwt_decode(token);
      setRole(decoded.role);
    };
    getToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {role === roles.admin ? (
        <Text>Welcome, Admin!</Text>
      ) : (
        <Text>Welcome, User!</Text>
      )}
    </View>
  );
};
