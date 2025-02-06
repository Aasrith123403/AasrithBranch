import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Animation configuration
const MIN_SIZE = 20;
const MAX_SIZE = 80;
const BASE_SPARTAN_GREEN = '#005A3D';
const BASE_GREY = '#343434';

// Helper function to generate random colors
const generateRandomColor = (baseColor: string): string => {
  const isGreen = baseColor === BASE_SPARTAN_GREEN;

  // Convert base color to RGB
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);

  // Generate random variation
  const variation = Math.floor(Math.random() * 60) - 30; // -30 to +30

  // Apply different variations for green vs grey
  let newR = 0, newG = 0, newB = 0;
  if (isGreen) {
    newR = Math.max(0, Math.min(255, r + variation * 0.3));
    newG = Math.max(0, Math.min(255, g + variation));
    newB = Math.max(0, Math.min(255, b + variation * 0.3));
  } else {
    // For grey, keep R,G,B values equal but vary the intensity
    const greyVariation = Math.max(0, Math.min(255, r + variation));
    newR = newG = newB = greyVariation;
  }

  // Generate random opacity between 0.3 and 0.6
  const opacity = (Math.random() * 0.3 + 0.3).toFixed(2);

  return `rgba(${Math.floor(newR)}, ${Math.floor(newG)}, ${Math.floor(newB)}, ${opacity})`;
};

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [period, setPeriod] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  // Create movement and opacity animations
  const [moveAnimY] = useState(new Animated.Value(0));

  // UI fade animations
  const [animations] = useState({
    headerFade: new Animated.Value(0),
    timeCardFade: new Animated.Value(0),
    titleFade: new Animated.Value(0),
    periodCardFades: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ]
  });

  // Function to start UI animations
  const startAnimations = () => {
    animations.headerFade.setValue(0);
    animations.timeCardFade.setValue(0);
    animations.titleFade.setValue(0);
    animations.periodCardFades.forEach(anim => anim.setValue(0));

    Animated.stagger(100, [
      Animated.timing(animations.headerFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animations.timeCardFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animations.titleFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      ...animations.periodCardFades.map(fade =>
        Animated.timing(fade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ]).start();
  };

  // Start background animation
  useEffect(() => {
    const startBackgroundAnimation = () => {
      // Reset all animations
      moveAnimY.setValue(0);

      const animationSequence = Animated.loop(
        Animated.timing(moveAnimY, {
          toValue: 1,
          duration: 60000, // 1 minute duration
          useNativeDriver: true,
        })
      );

      // Start the animation loop
      animationSequence.start();
    };

    startBackgroundAnimation();
  }, [moveAnimY]);

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        startAnimations();
      }
      setAppState(nextAppState);
    });

    startAnimations();

    return () => {
      subscription.remove();
    };
  }, [appState]);

  // Time and period update logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const calculatePeriod = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentDay = now.getDay();

      if (currentDay === 1 || currentDay === 4 || currentDay === 5) {
        if (hours === 8 && minutes < 50) setPeriod(1);
        else if (hours === 8 && minutes >= 50 && minutes < 55) setPeriod(11);
        else if ((hours === 8 && minutes >= 55) || (hours === 9 && minutes < 45)) setPeriod(2);
        else if (hours === 9 && minutes >= 45 && minutes < 50) setPeriod(22);
        else if ((hours === 9 && minutes >= 50) || (hours === 10 && minutes < 40)) setPeriod(3);
        else if (hours === 10 && minutes >= 40 && minutes < 45) setPeriod(33);
        else if ((hours === 10 && minutes >= 45) || (hours === 11 && minutes < 35)) setPeriod(4);
        else setPeriod(0);
      }
    };

    calculatePeriod();
    const periodTimer = setInterval(calculatePeriod, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(periodTimer);
    };
  }, []);

  const patterns = useMemo(() => {
    const patterns = [];
    const maxDimension = Math.max(width, height);
    const movementRange = height * 2; // Vertical movement range for smoother motion
    const circleCount = Math.ceil((maxDimension * maxDimension) / (MAX_SIZE * MAX_SIZE) * 2); // More circles

    // Create a wider initial spread of circles
    const spreadWidth = width;
    const spreadHeight = height * 2;
    const startOffsetY = -height * 0.5;

    for (let i = 0; i < circleCount; i++) {
      const baseColor = Math.random() > 0.5 ? BASE_SPARTAN_GREEN : BASE_GREY;
      const color = generateRandomColor(baseColor);
      const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;

      // Distribute circles across a wider area
      const startX = Math.random() * spreadWidth;
      const startY = startOffsetY + Math.random() * spreadHeight;

      patterns.push(
        <Animated.View
          key={`circle-${i}`}
          style={[
            styles.pattern,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              left: startX,
              top: startY,
              transform: [
                {
                  translateY: moveAnimY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, movementRange]
                  })
                }
              ]
            }
          ]}
        />
      );
    }
    return patterns;
  }, [moveAnimY]);

  const upcomingPeriods = [
    { number: '1', time: '8:00 AM' },
    { number: '2', time: '9:00 AM' },
    { number: '3', time: '10:00 AM' },
    { number: '4', time: '11:00 AM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        {patterns}
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.header, { opacity: animations.headerFade }]}>
          <Ionicons name="calendar-outline" size={24} color="#ffffff" />
          <Text style={styles.dateText}>
            Today, {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            })} 🎓
          </Text>
        </Animated.View>

        <Animated.View style={[styles.timeCard, { opacity: animations.timeCardFade }]}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.periodText}>
            Period {period || 'Not in session'}
          </Text>
        </Animated.View>

        <Animated.Text style={[styles.upcomingTitle, { opacity: animations.titleFade }]}>
          Upcoming Periods
        </Animated.Text>

        <View style={styles.upcomingContainer}>
          {upcomingPeriods.map((period, index) => (
            <Animated.View
              key={index}
              style={[{ opacity: animations.periodCardFades[index] }]}
            >
              <TouchableOpacity
                style={styles.upcomingCard}
                activeOpacity={0.7}
              >
                <View style={styles.periodContent}>
                  <Ionicons name="time-outline" size={24} color="#ffffff" />
                  <View style={styles.periodInfo}>
                    <Text style={styles.periodTitle}>Period {period.number}</Text>
                    <Text style={styles.periodTime}>{period.time} Tomorrow</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#ffffff" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424', // Darker background
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  pattern: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 10,
  },
  timeCard: {
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
    elevation: 5,
  },
  timeText: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },
  periodText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
    fontWeight: '500',
  },
  upcomingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    letterSpacing: 1,
  },
  upcomingContainer: {
    gap: 15,
  },
  upcomingCard: {
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ffffff',
    elevation: 3,
  },
  periodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodInfo: {
    flex: 1,
    marginLeft: 15,
  },
  periodTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  periodTime: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
});

export default TimeComponent;