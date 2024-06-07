// App.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationScreen() {
  const [code, setCode] = useState(Array(5).fill(''));
  const inputs = useRef([]);
  const navigation = useNavigation();

  const handleChangeText = (text, index) => {
    // Filter out non-numeric characters
    const sanitizedText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = sanitizedText;
    setCode(newCode);

    // Move to next input if current input is filled
    if (sanitizedText && index < 4) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subtitle}>
        We have sent a message to your email. Please enter the 5 digit code below.
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => inputs.current[index] = ref}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={digit}
          />
        ))}
      </View>
      <TouchableOpacity onPress={ () => navigation.push('ResetPassword') } style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Developed by</Text>
      <Text style={styles.footerBold}>DEVIVE GUYS</Text>
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

  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  },

  title: {
    fontSize: 30,
    color: '#004AAD',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 80,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#004AAD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 300,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  footer: {
    fontSize: 18,
    color: '#494949',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
  },
  
  footerBold: {
    fontSize: 18,
    color: '#494949',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
