import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function VerificationScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params.email; 

    const [resendDisabled, setResendDisabled] = useState(false); 
    const [timer, setTimer] = useState(null); 

    useEffect(() => {
        let interval;
        if (timer !== null && resendDisabled) { 
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 0) {
                        clearInterval(interval);
                        setResendDisabled(false); 
                        return 0;
                    }
                    return prevTimer - 1; 
                });
            }, 1000);
        }
        return () => clearInterval(interval); 
    }, [timer, resendDisabled]);

    const handleResendLink = async () => {
        setResendDisabled(true); 
        setTimer(300); 
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email); 
            Alert.alert('Password Reset Email Resent', 'Please check your email inbox for the password reset link.');
        } catch (error) {
            console.error('Error resending password reset email:', error);
            Alert.alert('Error', 'Failed to resend password reset email. Please try again later.');
            setResendDisabled(false); 
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.messageBox}>
                <Image source={require('../assets/verif.png')} style={styles.image} />
                <Text style={styles.title}>Password Reset Link Sent</Text>
                <Text style={styles.subtitle}>Check your email inbox for the password reset link.</Text>
            </View>
            {timer !== null && (
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>Resend Link in: {timer} seconds</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleResendLink} style={[styles.button, { backgroundColor: '#004AAD', opacity: resendDisabled ? 0.5 : 1 }]} disabled={resendDisabled}>
                    <Text style={styles.buttonText}>Resend Link</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, { backgroundColor: '#626262' }]}>
                    <Text style={styles.buttonText}>Back to Login</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 20,
    },
    messageBox: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    timerContainer: {
        marginBottom: 20,
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '48%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
