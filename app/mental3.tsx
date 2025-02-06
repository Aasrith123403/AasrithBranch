import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StudyTechniquesPage = () => {
  const router = useRouter();
  
  const techniques = [
    {
      title: 'Active Recall',
      icon: 'brain-outline',
      description: 'Testing yourself on material is far more effective than re-reading or highlighting. This technique strengthens memory and identifies knowledge gaps.',
      steps: [
        'Close your notes/books',
        'Write down everything you remember about the topic',
        'Create practice questions for yourself',
        'Use flashcards for key concepts',
        'Explain topics out loud without references'
      ],
      tips: [
        'Start with easier concepts',
        'Be honest about what you don\'t know',
        'Focus on understanding, not memorization',
        'Review missed points immediately'
      ]
    },
    {
      title: 'Spaced Repetition',
      icon: 'time-outline',
      description: 'Instead of cramming, space out your study sessions over time. This technique optimizes long-term retention and understanding.',
      schedule: [
        {
          timing: 'First Review',
          when: 'Within 24 hours of learning'
        },
        {
          timing: 'Second Review',
          when: '1 week later'
        },
        {
          timing: 'Third Review',
          when: '2 weeks later'
        },
        {
          timing: 'Ongoing Reviews',
          when: 'Monthly'
        }
      ],
      tips: [
        'Use a calendar to plan review sessions',
        'Keep reviews brief but focused',
        'Adjust intervals based on difficulty',
        'Combine with active recall'
      ]
    },
    {
      title: 'Feynman Technique',
      icon: 'school-outline',
      description: 'Named after physicist Richard Feynman, this technique involves explaining concepts in simple terms, as if teaching a child.',
      steps: [
        'Choose a concept to learn',
        'Explain it in simple language',
        'Identify gaps in your explanation',
        'Review and simplify further',
        'Repeat until mastery'
      ],
      examples: [
        'Use analogies to familiar concepts',
        'Avoid technical jargon',
        'Draw simple diagrams',
        'Write out explanations'
      ]
    }
  ];

  const quickStartTips = [
    'Set specific study goals',
    'Find a quiet study space',
    'Remove distractions',
    'Take regular breaks',
    'Stay hydrated and rested'
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

        <Text style={styles.title}>Top Study Techniques</Text>
        <Text style={styles.subtitle}>
          Evidence-based methods to help you learn more effectively and retain information longer.
        </Text>

        {/* Quick Tips Box */}
        <View style={styles.quickTipsBox}>
          <View style={styles.quickTipsHeader}>
            <Ionicons name="flash-outline" size={24} color="#fff" />
            <Text style={styles.quickTipsTitle}>Quick Start Guide</Text>
          </View>
          {quickStartTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipDot}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Main Techniques */}
        {techniques.map((technique, index) => (
          <View key={index} style={styles.techniqueCard}>
            <View style={styles.techniqueHeader}>
              <Ionicons name={technique.icon as any} size={28} color="#fff" />
              <Text style={styles.techniqueTitle}>{technique.title}</Text>
            </View>
            
            <Text style={styles.techniqueDescription}>
              {technique.description}
            </Text>

            {technique.steps && (
              <View style={styles.stepsContainer}>
                <Text style={styles.stepsTitle}>Implementation Steps:</Text>
                {technique.steps.map((step, stepIndex) => (
                  <View key={stepIndex} style={styles.stepItem}>
                    <Text style={styles.stepNumber}>{stepIndex + 1}.</Text>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            )}

            {technique.schedule && (
              <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleTitle}>Review Schedule:</Text>
                {technique.schedule.map((item, scheduleIndex) => (
                  <View key={scheduleIndex} style={styles.scheduleItem}>
                    <Text style={styles.scheduleTiming}>{item.timing}:</Text>
                    <Text style={styles.scheduleWhen}>{item.when}</Text>
                  </View>
                ))}
              </View>
            )}

            {technique.tips && (
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>Pro Tips:</Text>
                {technique.tips.map((tip, tipIndex) => (
                  <View key={tipIndex} style={styles.proTipItem}>
                    <Text style={styles.tipDot}>•</Text>
                    <Text style={styles.proTipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}

            {technique.examples && (
              <View style={styles.examplesContainer}>
                <Text style={styles.examplesTitle}>Examples:</Text>
                {technique.examples.map((example, exampleIndex) => (
                  <View key={exampleIndex} style={styles.exampleItem}>
                    <Text style={styles.tipDot}>•</Text>
                    <Text style={styles.exampleText}>{example}</Text>
                  </View>
                ))}
              </View>
            )}
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
  quickTipsBox: {
    backgroundColor: '#343434',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  quickTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickTipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipDot: {
    color: '#fff',
    marginRight: 8,
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
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
    marginBottom: 12,
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
  scheduleContainer: {
    backgroundColor: '#343434',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  scheduleTiming: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    width: 100,
  },
  scheduleWhen: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  tipsContainer: {
    backgroundColor: '#343434',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  proTipItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  proTipText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  examplesContainer: {
    backgroundColor: '#343434',
    borderRadius: 8,
    padding: 12,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  exampleItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  exampleText: {
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

export default StudyTechniquesPage;