import { StyleSheet, Text, View, Button } from "react-native";
import LoginScreen from "./modules/Login/Login.screen";
import { useEffect, useState } from "react";
import { ProtectedScreen } from "./modules/todo/Protected.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [token, setToken] = useState(null);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };
  return (
    <View style={styles.container}>
      {token ? (
        <ProtectedScreen token={token} />
      ) : (
        <LoginScreen setToken={setToken} />
      )}
      {token && <Button title="Logout" onPress={handleLogout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
