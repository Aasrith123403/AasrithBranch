import React from 'react';
import {
  StyleSheet, View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Default } from '@/components/Default';
import { SpartanSmall } from '@/components/SpartanSmall';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Club = {
  id: number;
  name: string;
  description: string;
};

const clubs = [
  "blurb",
  "Amnesty International",
  "Artistry Club",
  "Athletes for Kids",
  "Badminton Club",
  "Baking Club",
  "Band",
  "Behavioral Economics Club",
  "Best Buddies International",
  "Bible Club",
  "Biology Club",
  "Black Student Union",
  "Build A Home",
  "Cancer Awareness Club",
  "Car Club",
  "Chemistry Club",
  "Chess Club",
  "Chinese Club",
  "Choir Club",
  "Class Council 2025",
  "Class Council 2026",
  "Class Council 2027",
  "Class Council 2028",
  "Club Med",
  "Competitive Coding Club",
  "Crafts for Causes Club",
  "Crochet Club",
  "DECA",
  "Drama Club",
  "Engineering Club",
  "FBLA",
  "FCCLA",
  "Fighting Hunger Club",
  "Film Club",
  "Forensics Club",
  "Game Club",
  "Game Design Club",
  "Girls Who Code",
  "Green Team",
  "GSA",
  "Indian Culture Club",
  "Investing Club",
  "Journalism Club",
  "Key Club",
  "Latinos Unidos",
  "Marine Science Club",
  "Math Club",
  "Mock Trial Club",
  "Model UN",
  "Music Production Club",
  "Muslim Student Association",
  "Newcomers Empowerment Society",
  "NHS",
  "Orchestra Club",
  "Pencils of Promise",
  "Physics Club",
  "Quiz Bowl Club",
  "Red Cross Club",
  "Robotics Team",
  "Rocketry Club",
  "Science National Honor Society",
  "Science Olympiad",
  "Self-Care Club",
  "Spanish Club",
  "Speech and Debate",
  "TECH Club",
  "Technovation",
  "TSA",
  "Upcycling Club",
  "We Care Club",
  "Web and AI Club",
  "Yearbook Club"
];

const Description = [
  "blurb",
  "Tuesday 3:10 PM in 2115",
  "Friday time not specified in not specified",
  "Third Wednesday of Every Month 8:00 AM in P-12",
  "Wednesday 9:00 AM in Olympic Gym",
  "Alternating Monday 3:00 PM in 2406",
  "Not specified",
  "Tuesday 3:00 PM in Ciustea Room",
  "Not specified",
  "Monday 3:00 PM in not specified",
  "First and Third Thursday 3:00 PM in 1107",
  "Not specified",
  "Every other Friday 3:00 PM in 2416",
  "Every other Tuesday 3:00 PM in 2111",
  "Monthly Thursday in any room",
  "Alternating Tuesday 3:00 PM in 1419",
  "Tuesday 3:00 PM in 2118",
  "Tuesday 3:00 PM in 2114",
  "Alternating Wednesday 9:30 AM in Choir Room",
  "Fall registration required",
  "Fall registration required",
  "Fall registration required",
  "Fall registration required",
  "Wednesday 9:00 AM in 1406",
  "Wednesday 4:00 PM in P-14",
  "Every other Monday 3:00 PM in 2115",
  "Wednesday 4:00 PM in 1115",
  "Monday 3:00 PM in 1402",
  "Second Friday 3:10 PM in Theater",
  "Room 1304 - time not specified",
  "Alternating Tuesday 3:00 PM in 2064",
  "Every other Monday 3:10 PM in 2212",
  "Friday 3:00 PM in 2416",
  "Monday 3:00 PM in 2302",
  "Thursday 3:00 PM in 1412",
  "Thursday 3:00 PM in 2404",
  "Friday 3:00 PM in 2207",
  "Alternating Monday 3:00 PM in Brown Room",
  "Not specified",
  "Monday 3:00 PM in 1311",
  "Every other Monday 3:00 PM in 1419",
  "Third and Fourth Wednesday 9:00 AM in 2116",
  "Monday in Library",
  "Wednesday 4:00 PM in 1406",
  "Every other Tuesday 3:00 PM in 1117",
  "First and Third Monday in Wilson Room",
  "Not specified",
  "Tuesday and Thursday 3:00 PM in P-10",
  "Friday 3:00 PM in 2406",
  "Alternating Thursday 3:00 PM in 2302",
  "Every other Tuesday 3:00 PM in 2111",
  "Alternating Thursday 3:00 PM in not specified",
  "Monthly Wednesday 9:30 AM in Library",
  "Not specified",
  "Every other Monday 3:00 PM in P-15",
  "Monday 3:00 PM in Bird Room",
  "Friday 7:00 AM in Foster Room",
  "First and Third Tuesday in not specified",
  "Tuesday and Thursday 6:00 PM in 1214",
  "Thursday 3:00 PM in P-14",
  "Not specified",
  "Thursday 3:10 PM in 3105",
  "Not specified",
  "Not specified",
  "Monday 3:15 PM in 2416",
  "Room P-13 - time not specified",
  "Tuesday 3:00 PM in 1212",
  "Not specified",
  "Alternating Friday 3:00 PM in 2212",
  "Every other Thursday 3:00 PM in 1419",
  "Tuesday and alternating Monday in not specified",
  "Not specified"
];

const CLUBS: Club[] = Array.from({ length: clubs.length - 1 }, (_, index) => ({
  id: index + 1,
  name: clubs[index + 1],
  description: Description[index + 1],
}));

const Clubs = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState(CLUBS);  // Initial filtered clubs are all clubs
  const [clubid, setclubid] = useState(0);  // Store selected club ID

  const handleSearch = (query: string) => {
    setSearchQuery(query);  // Update search query
    if (query.trim() === '') {
      setFilteredClubs(CLUBS);  // Reset to all clubs if query is empty
    } else {
      const filtered = CLUBS.filter((club) =>
        club.name.toLowerCase().includes(query.toLowerCase())  // Filter clubs based on search query
      );
      setFilteredClubs(filtered);  // Update filtered clubs state
    }
  };

  const renderClub = ({ item }: { item: Club }) => (
    <View style={styles.clubBox}>
      <Default />
      <View style={styles.clubDetails}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => {
            setclubid(item.id);  // Set selected club ID
            router.push(`/Club1?id=${item.id}`);  // Navigate to the detailed page for the club
          }}
        >
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <SpartanSmall/>
      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Skyline Clubs 🔎..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={handleSearch}  // Call handleSearch when the text changes
      />
      {/* Club list */}
      <FlatList
        data={filteredClubs}  // Display filtered clubs based on search query
        renderItem={renderClub}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchBar: {
    height: 30,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 10,
  },
  clubBox: {
    flexDirection: 'row',
    backgroundColor: '#005A3D',
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 5,
    alignItems: 'center', // Center content vertically
    justifyContent: 'center', // Center content horizontally
    padding: 5,
  },
  clubDetails: {
    height:100,
    flex: 1,
    marginLeft: 0,
    backgroundColor: '#343434',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center', // Center content vertically
    justifyContent: 'center',
    alignSelf: 'flex-start',
    padding: 10,

  },
  clubName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clubDescription: {
    color: '#ccc',
    fontSize: 11,
  },
  learnMoreButton: {
    backgroundColor: '#76C576',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Clubs;