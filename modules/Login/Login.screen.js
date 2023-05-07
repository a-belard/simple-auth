import React, { useState } from "react";
import { Button, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { users } from "../../data/users";
import jwt from "expo-jwt";
import { jwtSecret } from "../../data/jwtSecret";

const auth0ClientId = "<YOUR_AUTH0_CLIENT_ID>";
const auth0Domain = "<YOUR_AUTH0_DOMAIN>";

export default function LoginScreen({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const token = await AsyncStorage.setItem(
        "token",
        jwt.encode({ ...user }, jwtSecret)
      );
      setToken(jwt.encode({ ...user }, jwtSecret));
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>{error}</Text>
      <Button title="Login" onPress={handleLogin} />
    </>
  );
}
