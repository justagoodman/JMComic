// In App.js in a new project

import * as React from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import API, {API_ABILITY} from './API/BasicRequest';
import LatestComicScreen from './ComicView/ComicView';
import ReadScreen from './ComicReader/SimpleReader';
import {PermissionsAndroid} from 'react-native';
import {useEffect} from 'react';
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    requestCameraPermission();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LatestComic" component={LatestComicScreen} />
        <Stack.Screen name="ComicDetail" component={ReadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
