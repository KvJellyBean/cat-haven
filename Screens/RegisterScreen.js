import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Create an account so you can explore and find your pawmates</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#626262"
      />

      <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#626262"
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#626262"
        secureTextEntry
      />

      <TextInput 
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#626262"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.push('Login')}>
        <Text style={styles.haveAccount}>Already have an account</Text>
      </TouchableOpacity>
      
      <Text style={styles.continueText}>Or continue with</Text>
      
      <View style={styles.socialIcons}>
        <FontAwesome name="google" size={24} color="black" />
        <FontAwesome name="facebook" size={24} color="black" style={styles.icon} />
        <FontAwesome name="twitter" size={24} color="black" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },

  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#F1F4FF',
  },

  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#004AAD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  haveAccount: {
    fontSize: 18,
    color: '#000',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  continueText: {
    color: '#004AAD',
    marginBottom: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  icon: {
    marginLeft: 20,
  },
});