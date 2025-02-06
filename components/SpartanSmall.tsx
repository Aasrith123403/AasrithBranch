import { Text, View, StyleSheet, Image } from 'react-native';


export function SpartanSmall() {
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
    margin: 40,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 100,
    width:87.5,
    position:'absolute'
  }
});
