import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./components/test";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Test />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
