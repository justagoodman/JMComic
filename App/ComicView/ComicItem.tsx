import * as React from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  PostImage: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
});
// @ts-ignore
function ComicItem({data, navigation}) {
  const onPress = () => {
    navigation.navigate('ComicDetail', {
      id: data.id,
    });
    console.log('go to detail', data);
  };
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.PostImage}
          source={{
            uri: data.image,
          }}
        />
        <Text>{data.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ComicItem;
