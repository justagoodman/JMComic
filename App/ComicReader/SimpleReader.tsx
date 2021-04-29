import {useEffect, useState} from 'react';
import {GetComicDetail} from '../API/Comic';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import * as React from 'react';
import SingleImage from './SingleImage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

// @ts-ignore
function ReadScreen({route}) {
  const {id} = route.params;
  const [images, setImages] = useState([]);

  useEffect(() => {
    GetComicDetail(id).then((res) => {
      console.log('detail >>> ', res);
      setImages(res.images);
    });
  }, [id]);

  // @ts-ignore
  const renderItem = ({item}) => {
    return <SingleImage album={id} key={item} photo={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
}

export default ReadScreen;
