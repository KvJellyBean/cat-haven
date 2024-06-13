import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import OnboardingScreen from "./Screens/OnboardingScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ForgotPassword from "./Screens/ForgotPassword";
import VerificationScreen from "./Screens/VerificationScreen";
import ResetPassword from "./Screens/ResetPassword";
import HomeScreen from "./Screens/HomeScreen";
import FilterScreen from "./Screens/FilterScreen";
import PetList from "./Screens/PetList";
import FavouriteScreen from "./Screens/FavouriteScreen";
import LandingScreen from "./Screens/LandingScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PetDetailScreen from "./Screens/PetDetailScreen";
import PaymentMethod from "./Screens/PaymentMethod";
import AddPayment from "./Screens/AddPayment";
import Form from "./Screens/Form";
import CartPageScreen from "./Screens/CartPage";
import PersonalInformationPage from "./Screens/PersonalInformationPage";

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
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="PetList" component={PetList} />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Detail" component={PetDetailScreen} />
          <Stack.Screen name="AddPayment" component={AddPayment} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="CartPageScreen" component={CartPageScreen} />
          <Stack.Screen name="PersonalInformationPage" component={PersonalInformationPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
