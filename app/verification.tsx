import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from "../firebase";
import { sendEmailVerification } from 'firebase/auth';

const EmailVerificationScreen = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const auth = FIREBASE_AUTH;

  // Send the email verification when the component mounts
  useEffect(() => {
    const sendInitialVerification = async () => {
      if (auth.currentUser && !auth.currentUser.emailVerified && !emailSent) {
        try {
          await sendEmailVerification(auth.currentUser);
          setEmailSent(true); // Prevent duplicate sending
        } catch (error: any) {
          console.error('Error sending verification email:', error);
          setError('Failed to send verification email. Try again later.');
        }
      }
    };

    sendInitialVerification();
  }, [auth.currentUser, emailSent]);

  // Function to manually resend the verification email
  const resendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Verification email resent! Please check your inbox.');
      } catch (error: any) {
        console.error('Error resending verification:', error);
        if (error.code === 'auth/too-many-requests') {
          setError('Too many attempts. Please wait before trying again.');
        } else {
          setError('Failed to send verification email');
        }
      }
    } else {
      setError('No user found. Please sign up again.');
    }
  };

  // Function to check if the email is verified
  const checkVerification = async () => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          alert('Email verified successfully!');
          router.push('/SignInScreen');
        } else {
          setError('Email not verified yet. Please check your inbox.');
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        setError('Failed to check verification status.');
      }
      setLoading(false);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Email Verification</Text>
            <Text style={styles.subtitle}>Please verify your email</Text>
          </View>

          <Text style={styles.instructions}>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
              style={styles.buttonConfirm}
              onPress={checkVerification}
              disabled={loading}
          >
            <Text style={styles.buttonConfirmText}>
              {loading ? 'Checking...' : 'Check Verification Status'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonConfirm}
              onPress={resendVerification}
          >
            <Text style={styles.buttonConfirmText}>Resend Verification Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.signInLink}
              onPress={() => router.push('/SignInScreen')}
          >
            <Text style={styles.signInText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: '#18453B',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Nothing Font (5x7)',
    marginBottom: 10,
  },
  subtitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'Nothing Font (5x7)',
  },
  instructions: {
    color: 'beige',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Space Mono',
    lineHeight: 24,
  },
  buttonConfirm: {
    width: 200,
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'beige',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  buttonConfirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Space Mono',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Space Mono',
    textAlign: 'center',
  },
  signInLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    color: 'beige',
    fontFamily: 'Space Mono',
    fontSize: 14,
  }
});

export default EmailVerificationScreen;
