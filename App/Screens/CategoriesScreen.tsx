import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import * as React from 'react';

const globalStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function CategoriesScreen() {
  return (
    <View style={globalStyle.text}>
      <Text>Categories</Text>
    </View>
  );
}

export default CategoriesScreen;
