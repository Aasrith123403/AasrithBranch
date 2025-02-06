import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper'; // Import the Card component from React Native Paper
import { SpartanSmall } from '@/components/SpartanSmall'; // Assuming you have this component

const Club1= () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Heading Caption */}
      <Text style={styles.Caption}>
        Club2 🎃 {'\n'}
      </Text>

      {/* First Card */}
      <Card style={styles.Card}>
        <Text style={styles.timeText}>Spooky Time!</Text>
      </Card>

      {/* Second Card */}
      <Card style={styles.Card2}>
        <Text style={styles.timeText2}>Enjoy the fall vibes!</Text>
      </Card>

      {/* Another Sample Component (e.g., SpartanSmall) */}
      <SpartanSmall />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Card: {
    marginTop: 0,
    backgroundColor: '#5a5a5a',
    width: '90%',
    alignSelf: 'center',
    height: 90,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    marginBottom: 0,
  },
  Card2: {
    backgroundColor: '#5a5a5a',
    width: '90%',
    alignSelf: 'center',
    height: 60,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  Caption: {
    fontSize: 17.5,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  Caption1: {
    fontSize: 17.5,
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343434',
  },
  timeText: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timeText2: {
    fontSize: 17.5,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Club1;
