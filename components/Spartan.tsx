import { Text, View, StyleSheet, Image } from 'react-native';


export function Spartan() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
      </Text>
      <Image style={styles.logo} source={require('../assets/images/Michigan_State_Athletics_logo.svg.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 150,
    marginTop: 200,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 200,
    width:175,
    position:'absolute'
  }
});
