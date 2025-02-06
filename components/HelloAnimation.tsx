import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const HelloAnimation = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/images/qmkFbD50Vc.mp4')} // Local video file
        style={styles.video}
        resizeMode="contain" // You can also use 'contain', 'stretch', etc.
        controls={true} // Display native controls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300, // Adjust as needed
  },
});

export default HelloAnimation;
