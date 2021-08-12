import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import * as React from 'react';
import API from '../API/BasicRequest';
import {API_ABILITY} from '../API/APIConstant';

function fetchVideos(pageNo: number = 1, query: string = '') {
  const params = {
    video_type: 'movie',
    page: pageNo,
    search_query: query,
  };
  return API.GET(API_ABILITY.API_VIDEOS_LIST, params).then(res => {
    console.log(res);
  });
}

const globalStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function VideoScreen() {
  React.useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <View style={globalStyle.text}>
      <Text>Videos</Text>
    </View>
  );
}

export default VideoScreen;
