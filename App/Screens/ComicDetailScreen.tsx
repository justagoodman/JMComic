import {StyleSheet, StatusBar, View, Image} from 'react-native';
import {Button, Header, Text} from 'react-native-elements';
import * as React from 'react';
import {primary} from '../Theme';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native';
import {getAlbumPosterUrl} from '../API/BasicRequest';
import {GetComicDetail} from '../API/Comic';
import {ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const globalStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  content__title: {},
  tileImage: {
    flex: 1,
    height: '100%',
  },
  chapters: {
    width: '100%',
  },
});

function ComicDetailScreen({route}) {
  const navigation = useNavigation();
  const {params} = route;
  console.log(params);
  const posterUrl = getAlbumPosterUrl(params.id);
  console.log(posterUrl);
  const [chapters, setChapters] = React.useState([]);
  React.useEffect(() => {
    GetComicDetail(params.id).then(detail => {
      console.log('detail', detail);
      let series = detail.series || [];
      if (series.length === 0) {
        series.push({
          id: params.id,
        });
      }
      setChapters(series);
    });
  }, [params.id]);

  function read(item) {
    const {id, name} = item;
    navigation.navigate('Reader', {
      id,
      name,
    });
  }
  function renderLeftComponent({navigation}): React.ReactElement {
    return (
      <Button
        onPress={() => {navigation.goBack()}}
        buttonStyle={{alignSelf: 'center', padding: 0}}
        icon={<Icon name="arrow-back" size={24} color="white" />}
      />
    );
  }
  return (
    <SafeAreaView
      style={[globalStyle.container, {backgroundColor: primary.background}]}>
      <StatusBar
        // hidden={true}
        animated={true}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
        barStyle="dark-content"
        // backgroundCo00000lor={primary.background}
      />
      <ScrollView>
        <Header
          style={globalStyle.header}
          containerStyle={{alignItems: 'center'}}
          leftComponent={renderLeftComponent({navigation})}
          leftContainerStyle={{alignSelf: 'center'}}
          centerContainerStyle={{display: 'flex', alignItems: 'center'}}
          centerComponent={{text: params.name, style: {color: '#fff'}}}
        />
        <View style={globalStyle.content}>
          <View style={globalStyle.content__title}>
            <Image source={{uri: posterUrl, height: 400}} resizeMode="cover" />
            <Text>{params.name}</Text>
            <Text>{params.author}</Text>
            <Text>{params.description}</Text>
          </View>
        </View>
        <ScrollView>
          <View>
            {chapters.map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {
                  read(item);
                }}>
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={{marginRight: 16}}>第{i}话</Text>
                    <Text>{item.name}</Text>
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ComicDetailScreen;
