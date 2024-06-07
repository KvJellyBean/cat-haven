import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import OnboardingScreen from "./Screens/OnboardingScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ResetPassword from "./Screens/ResetPassword";
import HomeScreen from "./Screens/HomeScreen";
import FavouriteScreen from "./Screens/FavouriteScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [isSplashScreen, setIsSplashScreen] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {isSplashScreen ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
