
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView >
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: {
  flex:1,
  justifyContent:'center',
  alignItems:'center'
 },

});

export default App;