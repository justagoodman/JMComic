import * as React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {GetLatestComic} from '../API/Comic';
import ComicItem from './ComicItem';
import {getAlbumPostUrl} from '../API/BasicRequest';


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
function LatestComicScreen({navigation}) {
  const [comicData, setData] = useState([]);

  console.log(comicData);

  useEffect(() => {
    GetLatestComic().then((res) => {
      console.log('latest >>> ', res);
      res.forEach((comic) => {
        comic.image = getAlbumPostUrl(comic.id);
      });
      // @ts-ignore
      setData(res);
    });
  }, []);

  // @ts-ignore
  const renderItem = ({item}) => (
    <ComicItem navigation={navigation} data={item} key={item.id} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comicData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default LatestComicScreen;
