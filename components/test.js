import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

function Test() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timer, setTimer] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);

  useEffect(() => {
    if (!isActive) {
      setTimer(workDuration * 60);
    }
  }, [workDuration]);

  useEffect(() => {
    let interval;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (isActive && timer === 0) {
      setIsActive(false);
      if (isWork) {
        setTimer(breakDuration * 60);
      } else {
        setTimer(workDuration * 60);
      }
      setIsWork(!isWork);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer]);

  const addWork = () => {
    setWorkDuration(workDuration + 1);
  };

  const minusWork = () => {
    setWorkDuration(workDuration - 1);
  };

  const addBreak = () => {
    setBreakDuration(breakDuration + 1);
  };

  const minusBreak = () => {
    setBreakDuration(breakDuration - 1);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWork(true);
    setTimer(workDuration * 60);
  };

  // const formatTimer = () => {
  //   {
  //     Math.floor(timer / 60).toString().padStart;
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={{ position: "absolute" }}>
          <Text style={styles.textSession}>Session</Text>
          <Text style={(styles.textSession, { fontSize: 56 })}>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
            :{(timer % 60).toString().padStart(2, "0")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            top: 150,
          }}
        >
          <TouchableOpacity style={styles.playButton} onPress={toggleTimer}>
            <FontAwesome
              name={isActive ? "pause" : "play"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.repeatButton} onPress={resetTimer}>
            <FontAwesome name="repeat" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 55,
          top: 250,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
          <Text style={{ fontWeight: 500, fontSize: 24 }}>Break Length</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: 500, fontSize: 32 }}
              onPress={minusBreak}
            >
              -
            </Text>
            <Text
              style={{ fontWeight: 500, fontSize: 48, marginHorizontal: 10 }}
            >
              {breakDuration}
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 32 }} onPress={addBreak}>
              +
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
          <Text style={{ fontWeight: 500, fontSize: 24 }}>Session Length</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 32 }} onPress={minusWork}>
              -
            </Text>
            <Text
              style={{ fontWeight: 500, fontSize: 48, marginHorizontal: 10 }}
            >
              {workDuration}
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 32 }} onPress={addWork}>
              +
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    backgroundColor: "white",
    height: "40%",
    width: "80%",
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  textSession: { fontSize: 36, fontWeight: "500" },
  playButton: {
    height: 80,
    width: 80,
    borderRadius: 45,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  repeatButton: {
    height: 80,
    width: 80,
    borderRadius: 45,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
