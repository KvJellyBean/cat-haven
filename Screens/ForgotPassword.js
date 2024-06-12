import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }

        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            navigation.navigate('emailVerification', { email }); 
        } catch (error) {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Please enter your email to reset the password</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#626262"
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity onPress={handleResetPassword} style={styles.resetpassButton}>
                <Text style={styles.resetpassButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <Text style={styles.footerHeader}>Developed by</Text>
            <Text style={styles.footerTitle}>DEVIVE GUYS</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#004AAD',
        marginBottom: 10,
        marginTop: 60,
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
        color: '#fff',
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
