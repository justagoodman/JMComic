import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'react-native';
import SimpleReader from '../ComicReader/SimpleReader';
import {primary} from '../Theme';

const globalStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

function ComicReaderScreen({route}) {
  return (
    <SafeAreaView
      style={[globalStyle.container, {backgroundColor: primary.background}]}>
      <StatusBar
        hidden={true}
        animated={true}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
        barStyle="dark-content"
      />
      <SimpleReader route={route} />
    </SafeAreaView>
  );
}

export default ComicReaderScreen;
