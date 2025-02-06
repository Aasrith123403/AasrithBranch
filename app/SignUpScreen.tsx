import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [socialButtonsPressed, setSocialButtonsPressed] = useState([false, false, false]);
  const [confirmButtonPressed, setConfirmButtonPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const signUp = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await sendEmailVerification(user);
      alert('Verification email sent! Please check your inbox.');
      router.push('/verification');
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (  
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome,</Text>
          <Text style={styles.subtitle}>sign up to continue</Text>
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

        <View style={styles.loginWith}>
          {[0, 1, 2].map((index) => (
            <TouchableOpacity 
              activeOpacity={1}
              key={index}
              style={[
                styles.buttonLog,
                socialButtonsPressed[index] && styles.buttonPressed
              ]}
              onPressIn={() => {
                const newPressed = [...socialButtonsPressed];
                newPressed[index] = true;
                setSocialButtonsPressed(newPressed);
              }}
              onPressOut={() => {
                const newPressed = [...socialButtonsPressed];
                newPressed[index] = false;
                setSocialButtonsPressed(newPressed);
              }}
            >
              {index === 0 ? (
                <Text style={styles.buttonLogText}>t</Text>
              ) : index === 1 ? (
                <Ionicons name="logo-google" size={24} color="black" />
              ) : (
                <Ionicons name="logo-facebook" size={24} color="black" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.buttonConfirm,
            confirmButtonPressed && styles.buttonPressed
          ]}
          onPressIn={signUp}
          onPressOut={() => {
            setConfirmButtonPressed(false);
          }}
          activeOpacity={1}
          disabled={loading}
        >
          <Text style={styles.buttonConfirmText}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonConfirm,
            confirmButtonPressed && styles.buttonPressed
          ]}
          onPressIn={() => router.push('./explore')}
          onPressOut={() => {
            setConfirmButtonPressed(false);
          }}
          activeOpacity={1}
        >
          <Text style={styles.buttonConfirmText}>enter app test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonConfirm,
            confirmButtonPressed && styles.buttonPressed
          ]}
          onPressIn={() => router.push('/SignInScreen')}
          onPressOut={() => {
            setConfirmButtonPressed(false);
          }}
          activeOpacity={1}
        >
          <Text style={styles.buttonConfirmText}>Already have an account? Sign in</Text>
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
  loginWith: {
    flexDirection: 'row',
    gap: 20,
  },
  buttonLog: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'beige',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    transform: [{ translateX: 0 }, { translateY: 0 }],
  },
  buttonLogText: {
    fontSize: 25,
    color: '#323232',
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
});

export default SignUpScreen;