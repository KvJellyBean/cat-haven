import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import emailVerification from "./Screens/emailVerif";
import PaymentSuccess from "./Screens/SuccessModal";
import ProfilePaymentMethod from "./Screens/ProfilePaymentMethod";
import ProfileAddPaymentMethod from "./Screens/ProfileAddPayment";

const Stack = createNativeStackNavigator();

function App() {

  const [initialRoute, setInitialRoute] = React.useState(null);
  const [isSplashScreen, setIsSplashScreen] = React.useState(true);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const auth = getAuth();
        const userToken = await AsyncStorage.getItem("userToken");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        const userData = await AsyncStorage.getItem("userData");
        const email = await AsyncStorage.getItem("userEmail");
        const password = await AsyncStorage.getItem("userPassword");
  
        if (userToken && userData && email && password) {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            setInitialRoute("Home");
          } catch (reAuthError) {
            setInitialRoute("Onboarding");
          }
        } else {
          const user = await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
              unsubscribe();
              resolve(user);
            });
          });
  
          if (user) {
            await AsyncStorage.setItem("isLoggedIn", "true");
            await AsyncStorage.setItem("userData", JSON.stringify(user));
            setInitialRoute("Home");
          } else {
            if (isLoggedIn === "true") {
              setInitialRoute("Home");
            } else {
              setInitialRoute("Onboarding");
            }
          }
        }
      } catch (error) {
        setInitialRoute("Onboarding");
      };
    };
  
    // Set default value to "false" if no value is stored
    AsyncStorage.getItem("isLoggedIn").then((value) => {
      if (!value) {
        AsyncStorage.setItem("isLoggedIn", "false");
      }
      checkLoginStatus();
    });
  
    // Clear timeout for splash screen
    const splashTimeout = setTimeout(() => {
      setIsSplashScreen(false);
    }, 3000);
  
    return () => clearTimeout(splashTimeout);
  }, []);

  if (isSplashScreen || initialRoute === null) {
    return <SplashScreen />;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {isSplashScreen ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Form" component={Form} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} />
            <Stack.Screen name="PetList" component={PetList} />
            <Stack.Screen name="Favourite" component={FavouriteScreen} />
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Detail" component={PetDetailScreen} />
            <Stack.Screen name="AddPayment" component={AddPayment} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
            <Stack.Screen name="CartPageScreen" component={CartPageScreen} />
            <Stack.Screen name="PersonalInformationPage" component={PersonalInformationPage} />
            <Stack.Screen name="emailVerification" component={emailVerification} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            <Stack.Screen name="ProfilePaymentMethod" component={ProfilePaymentMethod} />
            <Stack.Screen name="ProfileAddPaymentMethod" component={ProfileAddPaymentMethod} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;