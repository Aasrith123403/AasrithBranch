import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StressManagementPage = () => {
  const router = useRouter();
  
  const tips: Array<{
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    description: string;
    steps: string[];
  }> = [
    {
      title: 'Deep Breathing',
      icon: 'leaf-outline',
      description: 'Practice the 4-7-8 technique: Inhale for 4 seconds, hold for 7, exhale for 8. This helps activate your body\'s relaxation response.',
      steps: [
        'Find a comfortable position',
        'Breathe in through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale completely through your mouth for 8 counts',
        'Repeat 4 times'
      ]
    },
    {
      title: 'Progressive Relaxation',
      icon: 'body-outline',
      description: 'Systematically tense and relax different muscle groups to reduce physical tension and mental stress.',
      steps: [
        'Start with your toes and feet',
        'Tense each muscle group for 5 seconds',
        'Release and feel the tension flow away',
        'Move up through your body',
        'End with your face and head'
      ]
    },
    {
      title: 'Time Management',
      icon: 'time-outline',
      description: 'Break large tasks into smaller, manageable pieces. Use a planner or digital calendar to stay organized.',
      steps: [
        'List your tasks and priorities',
        'Break big tasks into smaller steps',
        'Set realistic deadlines',
        'Take regular breaks',
        'Celebrate small wins'
      ]
    },
    {
      title: 'Physical Activity',
      icon: 'fitness-outline',
      description: 'Regular exercise releases endorphins, which are natural stress relievers. Even a short walk can help clear your mind.',
      steps: [
        'Aim for 30 minutes daily',
        'Choose activities you enjoy',
        'Start with small goals',
        'Include both cardio and stretching',
        'Make it a regular habit'
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Managing Stress</Text>
        <Text style={styles.subtitle}>
          Try these evidence-based techniques to help reduce stress and improve your wellbeing.
        </Text>

        {/* Tips Section */}
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Ionicons name={tip.icon} size={28} color="#fff" />
              <Text style={styles.tipTitle}>{tip.title}</Text>
            </View>
            
            <Text style={styles.tipDescription}>
              {tip.description}
            </Text>

            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>How to practice:</Text>
              {tip.steps.map((step, stepIndex) => (
                <View key={stepIndex} style={styles.stepItem}>
                  <Text style={styles.stepDot}>•</Text>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Additional Resources */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 24,
    lineHeight: 22,
  },
  tipCard: {
    backgroundColor: '#005A3D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  tipDescription: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 16,
    lineHeight: 21,
  },
  stepsContainer: {
    backgroundColor: '#343434',
    borderRadius: 8,
    padding: 12,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  stepDot: {
    color: '#fff',
    marginRight: 8,
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  resourceButton: {
    backgroundColor: '#343434',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  resourceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default StressManagementPage;