import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Please enter your email to reset the password</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#626262"
      />
      
      <TouchableOpacity style={styles.resetpassButton}>
        <Text style={styles.resetpassButtonText}>Reset Password</Text>
      </TouchableOpacity>

      <Text style={styles.footerHeader}>
        Developed by
      </Text>
      <Text style={styles.footerTitle}>
        DEVIVE GUYS
      </Text>
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
    marginBottom: 50,
  },

  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#F1F4FF',
  },

  resetpassButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#004AAD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 350,
  },
  resetpassButtonText: {
    color: '#fffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  footerHeader: {
    fontSize: 18,
    color: '#494949',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  footerTitle: {
    fontSize: 18,
    color: '#494949',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});