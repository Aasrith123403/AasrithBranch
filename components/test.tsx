import { Text, View, StyleSheet, Image } from 'react-native';


export function Test() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/test.jpg')}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    logo: {
      width: 210,
      height: 300,
      borderRadius: 10,
      marginLeft:0,
    }
  });