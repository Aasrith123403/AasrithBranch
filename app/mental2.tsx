import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AnxietyManagementPage = () => {
  const router = useRouter();
  
  const techniques = [
    {
      title: '5-4-3-2-1 Grounding',
      icon: 'eye-outline' as const,
      description: 'A mindfulness technique to anchor yourself in the present moment when anxiety feels overwhelming.',
      steps: [
        'Name 5 things you can see',
        'Touch 4 things you can feel',
        'Identify 3 things you can hear',
        'Notice 2 things you can smell',
        'Focus on 1 thing you can taste'
      ]
    },
    {
      title: 'Thought Challenging',
      icon: 'git-branch-outline' as const,
      description: 'Question and reframe anxious thoughts to develop a more balanced perspective.',
      steps: [
        'Identify the anxious thought',
        'Rate how much you believe it (0-100%)',
        'Look for evidence for and against',
        'Consider alternative explanations',
        'Create a more balanced thought'
      ]
    },
    {
      title: 'Quick Calm Technique',
      icon: 'water-outline' as const,
      description: 'A rapid method to reduce anxiety symptoms using your breath and body.',
      steps: [
        'Find a comfortable position',
        'Take a slow, deep breath',
        'Drop your shoulders',
        'Unclench your jaw',
        'Release tension in your hands'
      ]
    },
    {
      title: 'Anxiety Journal',
      icon: 'journal-outline' as const,
      description: 'Track your anxiety triggers and responses to better understand and manage them.',
      steps: [
        'Note the date and time',
        'Rate your anxiety level (1-10)',
        'Describe the situation',
        'List physical symptoms',
        'Write what helped you cope'
      ]
    },
    {
      title: 'Body Scan Relaxation',
      icon: 'body-outline' as const,
      description: 'Systematically release tension throughout your body to reduce anxiety.',
      steps: [
        'Start at your toes',
        'Notice any tension',
        'Consciously relax each part',
        'Slowly move up your body',
        'Take your time with each area'
      ]
    }
  ];

  const emergencyTips = [
    'Find a quiet space if possible',
    'Focus on slowing your breathing',
    'Call a trusted friend or family member',
    'Remember this will pass',
    'Use cold water on your face to reset'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Managing Anxiety</Text>
        <Text style={styles.subtitle}>
          These evidence-based techniques can help you cope with anxiety and find calm in difficult moments.
        </Text>

        {/* Emergency Tips Box */}
        <View style={styles.emergencyBox}>
          <View style={styles.emergencyHeader}>
            <Ionicons name="alert-circle" size={24} color="#fff" />
            <Text style={styles.emergencyTitle}>For Immediate Relief</Text>
          </View>
          {emergencyTips.map((tip, index) => (
            <View key={index} style={styles.emergencyTip}>
              <Text style={styles.tipDot}>•</Text>
              <Text style={styles.emergencyTipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Techniques Section */}
        <Text style={styles.sectionTitle}>Coping Techniques</Text>
        {techniques.map((technique, index) => (
          <View key={index} style={styles.techniqueCard}>
            <View style={styles.techniqueHeader}>
              <Ionicons name={technique.icon} size={28} color="#fff" />
              <Text style={styles.techniqueTitle}>{technique.title}</Text>
            </View>
            
            <Text style={styles.techniqueDescription}>
              {technique.description}
            </Text>

            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>Steps:</Text>
              {technique.steps.map((step, stepIndex) => (
                <View key={stepIndex} style={styles.stepItem}>
                  <Text style={styles.stepNumber}>{stepIndex + 1}.</Text>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Resources Button */}
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
  emergencyBox: {
    backgroundColor: '#343434',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  emergencyTip: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipDot: {
    color: '#fff',
    marginRight: 8,
    fontSize: 16,
  },
  emergencyTipText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  techniqueCard: {
    backgroundColor: '#005A3D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  techniqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  techniqueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  techniqueDescription: {
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
  stepNumber: {
    color: '#fff',
    marginRight: 8,
    fontSize: 14,
    width: 20,
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

export default AnxietyManagementPage;