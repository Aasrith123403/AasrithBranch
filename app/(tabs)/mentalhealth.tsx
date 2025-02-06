import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking, Clipboard, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MentalHealthPage = () => {
  const router = useRouter();
  
  const resources: Array<{
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    description: string;
    id: number;
  }> = [
    {
      title: 'Tips for Managing Stress',
      icon: 'bulb-outline',
      description: 'Learn techniques like deep breathing, journaling, and mindfulness to reduce stress.',
      id: 1
    },
    {
      title: 'Coping with Anxiety',
      icon: 'heart-outline',
      description: 'Discover strategies to manage anxiety and regain a sense of calm.',
      id: 2
    },
    {
      title: 'The Top 3 BEST Study Techniques',
      icon: 'chatbubble-outline',
      description: '3 methods on how to study efficiently, and effectivley. Click for a tutorial',
      id: 3
    },
    
  ];

  const hotlines = [
    { name: 'School Counselor', contact: '555-1234', type: 'phone' },
    { name: 'National Helpline', contact: '18006624357', type: 'phone' }, // Formatted for dialing
    { name: 'Crisis Text Line', contact: '741741', type: 'text' },
  ];

  const handleContact = async (contact: string, type: string) => {
    // Copy number to clipboard
    await Clipboard.setString(contact);

    // For phone numbers, attempt to open dialer
    if (type === 'phone') {
      const phoneUrl = Platform.select({
        ios: `tel://${contact}`,
        android: `tel:${contact}`
      });
      
      try {
        if (phoneUrl) {
          const canOpen = await Linking.canOpenURL(phoneUrl);
          if (canOpen) {
            await Linking.openURL(phoneUrl);
          }
        }
      } catch (error) {
        console.error('Error opening phone dialer:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.safeArea1} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <Text style={styles.title}>Mental Health Resources 💚</Text>
          <Text style={styles.subtitle}>Your well-being matters. Here are some resources to support you:</Text>

          {/* Resources Section */}
          <View style={styles.cardContainer}>
            {resources.map((resource, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.clubBox} 
                activeOpacity={0.8}
                onPress={() => {
                  router.push(`/mental${resource.id}` as any);
                }}
              >
                <View style={styles.clubDetails}>
                  <Ionicons name={resource.icon} size={40} color="#fff" />
                  <Text style={styles.clubName}>{resource.title}</Text>
                  <Text style={styles.clubDescription}>{resource.description}</Text>
                  <View style={styles.learnMoreButton}>
                    <Text style={{ color: '#fff' }}>Learn More</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Hotline Section */}
          <Text style={styles.sectionTitle}>📞 Hotlines</Text>
          {hotlines.map((hotline, index) => (
            <TouchableOpacity
              key={index}
              style={styles.hotlineContainer}
              onPress={() => handleContact(hotline.contact, hotline.type)}
              activeOpacity={0.7}
            >
              <Text style={styles.clubName}>{hotline.name}</Text>
              <View style={styles.contactContainer}>
                <Text style={styles.clubDescription}>{hotline.contact}</Text>
                <Text style={styles.tapToCopy}>Tap to copy & {hotline.type === 'phone' ? 'call' : 'text'}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Emergency Banner */}
          <TouchableOpacity 
            style={styles.emergencyBanner} 
            activeOpacity={0.8}
            onPress={() => handleContact('911', 'phone')}
          >
            <Text style={styles.emergencyText}>
              If you are in crisis, please call 911 or your local emergency number immediately.
            </Text>
            <Text style={[styles.tapToCopy, { marginTop: 5 }]}>Tap to copy & call 911</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').height,
  },
  safeArea1: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#343434',
  },
  clubBox: {
    flexDirection: 'row',
    backgroundColor: '#005A3D',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    alignItems: 'center',
  },
  clubDetails: {
    flex: 1,
    marginLeft: 10,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  clubDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  learnMoreButton: {
    backgroundColor: '#343434',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  hotlineContainer: {
    backgroundColor: '#343434',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tapToCopy: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  emergencyBanner: {
    backgroundColor: '#343434',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MentalHealthPage;