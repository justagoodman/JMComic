// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreScreen from './Screens/ExploreScreen';
import CategoriesScreen from './Screens/CategoriesScreen';
import ComicDetailScreen from './Screens/ComicDetailScreen';
import ComicReaderScreen from './Screens/ComicReaderScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PermissionsAndroid} from 'react-native';

const BottomTabNav = createBottomTabNavigator();
const StackNav = createStackNavigator();

function AllTabs() {
  return (
    <BottomTabNav.Navigator
      tabBarOptions={{
        activeTintColor: '#3da9fc',
        inactiveTintColor: 'gray',
      }}>
      <BottomTabNav.Screen
        name="探索"
        options={{
          tabBarLabel: '探索',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={24} name="recommend" />
          ),
        }}
        component={ExploreScreen}
      />
      <BottomTabNav.Screen
        name="Category"
        options={{
          tabBarLabel: '分类',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={24} name="category" />
          ),
        }}
        component={CategoriesScreen}
      />
    </BottomTabNav.Navigator>
  );
}

function HomeStack() {
  function getTitle(route) {
    const {params} = route;
    if (!params) {
      return '详情';
    }
    const {name} = params;
    return name;
  }
  return (
    <StackNav.Navigator>
      <StackNav.Screen
        options={{headerShown: false}}
        name="tabsScreen"
        component={AllTabs}
      />
      <StackNav.Screen
        options={({route}) => ({
          title: getTitle(route),
          headerShown: false,
        })}
        name="ComicDetail"
        component={ComicDetailScreen}
      />
      <StackNav.Screen
        options={({route}) => ({
          title: getTitle(route),
          headerShown: false,
        })}
        name="Reader"
        component={ComicReaderScreen}
      />
    </StackNav.Navigator>
  );
}

const requestWritePermission = async () => {
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
const requestReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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

function App() {
  React.useEffect(() => {
    requestWritePermission().catch(err => {
      console.error(err);
    });
    requestReadPermission().catch(err => {
      console.error(err);
    });
  }, []);
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}

export default App;
