import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams} from 'expo-router';
import { Test } from '@/components/test';
type Club = {
  id: number;
  name: string;
  description: string;
  image: string;
};
// Updated dummy data for 20 clubs
//SUB CLUB PAGE
const position = [
  "President 1", "Vice President 1", "Secretary 1", "Treasurer 1", "Advisor 1",
  "President 2", "Vice President 2", "Secretary 2", "Treasurer 2", "Advisor 2",
  "President 3", "Vice President 3", "Secretary 3", "Treasurer 3", "Advisor 3",
  "President 4", "Vice President 4", "Secretary 4", "Treasurer 4", "Advisor 4",
  "President 5", "Vice President 5", "Secretary 5", "Treasurer 5", "Advisor 5",
  "President 6", "Vice President 6", "Secretary 6", "Treasurer 6", "Advisor 6",
  "President 7", "Vice President 7", "Secretary 7", "Treasurer 7", "Advisor 7",
  "President 8", "Vice President 8", "Secretary 8", "Treasurer 8", "Advisor 8",
  "President 9", "Vice President 9", "Secretary 9", "Treasurer 9", "Advisor 9",
  "President 10", "Vice President 10", "Secretary 10", "Treasurer 10", "Advisor 10",
  "President 11", "Vice President 11", "Secretary 11", "Treasurer 11", "Advisor 11",
  "President 12", "Vice President 12", "Secretary 12", "Treasurer 12", "Advisor 12",
  "President 13", "Vice President 13", "Secretary 13", "Treasurer 13", "Advisor 13",
  "President 14", "Vice President 14", "Secretary 14", "Treasurer 14", "Advisor 14",
  "President 15", "Vice President 15", "Secretary 15", "Treasurer 15", "Advisor 15",
  "President 16", "Vice President 16", "Secretary 16", "Treasurer 16", "Advisor 16",
  "President 17", "Vice President 17", "Secretary 17", "Treasurer 17", "Advisor 17",
  "President 18", "Vice President 18", "Secretary 18", "Treasurer 18", "Advisor 18",
  "President 19", "Vice President 19", "Secretary 19", "Treasurer 19", "Advisor 19",
  "President 20", "Vice President 20", "Secretary 20", "Treasurer 20", "Advisor 20",
  "President 21", "Vice President 21", "Secretary 21", "Treasurer 21", "Advisor 21",
  "President 22", "Vice President 22", "Secretary 22", "Treasurer 22", "Advisor 22",
  "President 23", "Vice President 23", "Secretary 23", "Treasurer 23", "Advisor 23",
  "President 24", "Vice President 24", "Secretary 24", "Treasurer 24", "Advisor 24",
  "President 25", "Vice President 25", "Secretary 25", "Treasurer 25", "Advisor 25",
  "President 26", "Vice President 26", "Secretary 26", "Treasurer 26", "Advisor 26",
  "President 27", "Vice President 27", "Secretary 27", "Treasurer 27", "Advisor 27",
  "President 28", "Vice President 28", "Secretary 28", "Treasurer 28", "Advisor 28",
  "President 29", "Vice President 29", "Secretary 29", "Treasurer 29", "Advisor 29",
  "President 30", "Vice President 30", "Secretary 30", "Treasurer 30", "Advisor 30",
  "President 31", "Vice President 31", "Secretary 31", "Treasurer 31", "Advisor 31",
  "President 32", "Vice President 32", "Secretary 32", "Treasurer 32", "Advisor 32",
  "President 33", "Vice President 33", "Secretary 33", "Treasurer 33", "Advisor 33",
  "President 34", "Vice President 34", "Secretary 34", "Treasurer 34", "Advisor 34",
  "President 35", "Vice President 35", "Secretary 35", "Treasurer 35", "Advisor 35",
  "President 36", "Vice President 36", "Secretary 36", "Treasurer 36", "Advisor 36",
  "President 37", "Vice President 37", "Secretary 37", "Treasurer 37", "Advisor 37",
  "President 38", "Vice President 38", "Secretary 38", "Treasurer 38", "Advisor 38",
  "President 39", "Vice President 39", "Secretary 39", "Treasurer 39", "Advisor 39",
  "President 40", "Vice President 40", "Secretary 40", "Treasurer 40", "Advisor 40",
  "President 41", "Vice President 41", "Secretary 41", "Treasurer 41", "Advisor 41",
  "President 42", "Vice President 42", "Secretary 42", "Treasurer 42", "Advisor 42",
  "President 43", "Vice President 43", "Secretary 43", "Treasurer 43", "Advisor 43",
  "President 44", "Vice President 44", "Secretary 44", "Treasurer 44", "Advisor 44",
  "President 45", "Vice President 45", "Secretary 45", "Treasurer 45", "Advisor 45",
  "President 46", "Vice President 46", "Secretary 46", "Treasurer 46", "Advisor 46",
  "President 47", "Vice President 47", "Secretary 47", "Treasurer 47", "Advisor 47",
  "President 48", "Vice President 48", "Secretary 48", "Treasurer 48", "Advisor 48",
  "President 49", "Vice President 49", "Secretary 49", "Treasurer 49", "Advisor 49",
  "President 50", "Vice President 50", "Secretary 50", "Treasurer 50", "Advisor 50",
  "President 51", "Vice President 51", "Secretary 51", "Treasurer 51", "Advisor 51",
  "President 52", "Vice President 52", "Secretary 52", "Treasurer 52", "Advisor 52",
  "President 53", "Vice President 53", "Secretary 53", "Treasurer 53", "Advisor 53",
  "President 54", "Vice President 54", "Secretary 54", "Treasurer 54", "Advisor 54",
  "President 55", "Vice President 55", "Secretary 55", "Treasurer 55", "Advisor 55",
  "President 56", "Vice President 56", "Secretary 56", "Treasurer 56", "Advisor 56",
  "President 57", "Vice President 57", "Secretary 57", "Treasurer 57", "Advisor 57",
  "President 58", "Vice President 58", "Secretary 58", "Treasurer 58", "Advisor 58",
  "President 59", "Vice President 59", "Secretary 59", "Treasurer 59", "Advisor 59",
  "President 60", "Vice President 60", "Secretary 60", "Treasurer 60", "Advisor 60",
  "President 61", "Vice President 61", "Secretary 61", "Treasurer 61", "Advisor 61",
  "President 62", "Vice President 62", "Secretary 62", "Treasurer 62", "Advisor 62",
  "President 63", "Vice President 63", "Secretary 63", "Treasurer 63", "Advisor 63",
  "President 64", "Vice President 64", "Secretary 64", "Treasurer 64", "Advisor 64",
  "President 65", "Vice President 65", "Secretary 65", "Treasurer 65", "Advisor 65",
  "President 66", "Vice President 66", "Secretary 66", "Treasurer 66", "Advisor 66",
  "President 67", "Vice President 67", "Secretary 67", "Treasurer 67", "Advisor 67",
  "President 68", "Vice President 68", "Secretary 68", "Treasurer 68", "Advisor 68",
  "President 69", "Vice President 69", "Secretary 69", "Treasurer 69", "Advisor 69",
  "President 70", "Vice President 70", "Secretary 70", "Treasurer 70", "Advisor 70",
  "President 71", "Vice President 71", "Secretary 71", "Treasurer 71", "Advisor 71"
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



  
const Clubs = () => {
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const cid = Number (params.id)
  const startIndex = (cid - 1) * 5; // 
  const CLUBS: Club[] = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: position[startIndex + index],
    description: Description[index+1],
    image: `./components/Club${index + 1}`, // Placeholder image URL with club index
  }));
  const renderClub = ({ item }: { item: Club }) => (
    <View style={styles.clubBox}>
      <Test/>
      <View style={styles.clubDetails}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={CLUBS}
        renderItem={renderClub}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default Clubs;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#343434',
  },
  listContainer: {
    paddingVertical: 10,
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
  clubImage: {
    borderRadius: 10,
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
  learnMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
