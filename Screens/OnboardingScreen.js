import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { onBoardingContent as slides } from "../data";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: label === "Start" || label === "Next" ? "black" : "grey",
            fontWeight: label === "Start" ? "500" : "normal",
            fontSize: 18,
            paddingHorizontal: 25,
            bottom: 40,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      style={{ paddingBottom: 100, backgroundColor: "white" }}
      data={slides}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: 300,
                height: 250,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 24,
                marginBottom: 30,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "grey",
                fontSize: 14,
                lineHeight: 24,
              }}
            >
              {item.description}
            </Text>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: "black",
        bottom: 40,
      }}
      dotStyle={{
        backgroundColor: "lightgrey",
        bottom: 40,
      }}
      showSkipButton
      showPrevButton
      renderNextButton={() => buttonLabel("Next")}
      renderSkipButton={() => buttonLabel("Skip")}
      renderPrevButton={() => buttonLabel("Back")}
      renderDoneButton={() => buttonLabel("Start")}
      onDone={() => {
        navigation.navigate("Login");
      }}
    />
  );
};

export default OnboardingScreen;
