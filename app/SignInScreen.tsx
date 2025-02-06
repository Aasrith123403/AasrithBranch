import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmButtonPressed, setConfirmButtonPressed] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        router.replace('./explore'); // Redirect to the account page
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const signIn = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Please verify your email before signing in');
        router.push('/verification');
        return;
      }

      router.replace('./explore'); // Redirect to account page
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later');
      } else {
        setError('Sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome back,</Text>
            <Text style={styles.subtitle}>sign in to continue</Text>
          </View>

          <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
          />

          <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
              style={[
                styles.buttonConfirm,
                confirmButtonPressed && styles.buttonPressed
              ]}
              onPressIn={signIn}
              onPressOut={() => {
                setConfirmButtonPressed(false);
              }}
              activeOpacity={1}
              disabled={loading}
          >
            <Text style={styles.buttonConfirmText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.signUpLink}
              onPress={() => router.push('./SignUpScreen')}
          >
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
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
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'beige',
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    padding: 10,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    fontFamily: 'Nothing Font (5x7)',
  },
  buttonConfirm: {
    width: 120,
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
    transform: [{ translateX: 0 }, { translateY: 0 }],
  },
  buttonConfirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#323232',
    fontFamily: 'Space Mono',
  },
  buttonPressed: {
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Space Mono',
    textAlign: 'center',
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: 'beige',
    fontFamily: 'Space Mono',
    fontSize: 14,
  },
});

export default SignInScreen;
