import {ImageBackground, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'react-native';
import {primary} from '../Theme';
import {Dimensions} from 'react-native';
import {GetLatestComic, getRandomComic} from '../API/Comic';
import {getAlbumPosterUrl} from '../API/BasicRequest';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableHighlight} from 'react-native';

const gap = 8;

const {width} = Dimensions.get('window');
const itemWidth = (width - 2 * gap) / 3;
const itemHeight = (itemWidth * 4) / 3;
console.log(width, itemHeight);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '33.33333%',
    resizeMode: 'contain',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderRadius: 8,
  },
  text: {
    position: 'absolute',
    height: 24,
    lineHeight: 24,
    width: itemWidth,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    textAlignVertical: 'center',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 4,
    paddingRight: 4,
  },
  fullImage: {
    width: itemWidth,
    height: itemHeight,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 16,
  },
  tagStyle: {
    position: 'absolute',
    top: 2,
    right: 2,
    padding: 4,
    backgroundColor: primary.primaryColor,
    textAlignVertical: 'center',
    borderRadius: 4,
  },
});

const globalStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function ExploreScreen(props): React.ReactElement {
  console.log(props);
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
        <ComicBlock navigator={props.navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface category {
  id: string;
  title: string;
}

interface ComicPosterProps {
  author: string;
  category: category;
  category_sub: category;
  description: string;
  id: string;
  image: string;
  name: string;
}

export function ComicBlock({navigator}): React.ReactElement {
  const [comics, setComics] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(0);
  React.useEffect(() => {
    GetLatestComic(pageNo).then(items => {
      items.forEach((item: ComicPosterProps) => {
        item.image = getAlbumPosterUrl(item.id);
      });
      console.log(items);
      setComics([...comics, ...items]);
    });
  }, [pageNo]);
  function _onScroll(evt) {
    console.log(evt);
    const event = evt['nativeEvent'];

    // 如果拖拽值超过底部50，且当前的scrollview高度大于屏幕高度，则加载更多
    const _num = event['contentSize']['height'] - event['contentOffset']['y'];
    const verlocity = event.velocity.y;

    console.log(verlocity, _num);
    if (verlocity && _num < 800) {
      setPageNo(pageNo + 1);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView onScrollEndDrag={_onScroll}>
        <View style={styles.container}>
          {comics.map((item: ComicPosterProps) => {
            return (
              <ComicListItem
                {...item}
                key={item.id}
                style={styles.image}
                posterUrl={item.image}
                tag={item.category.title}
                title={item.name}
                id={item.id}
                navigator={navigator}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface ComicListItemProps {
  posterUrl: string;
  title: string;
  tag: Array<string> | string | undefined;
  style: ViewStyle;
  id: string;
  navigator: any;
  description: string;
  author: string;
}

export function ComicListItem(props: ComicListItemProps): React.ReactElement {
  const shouldShowTag = !!props.tag;
  const badge = (): React.ReactElement => {
    let tag;
    if ((tag as any) instanceof Object) {
      tag = (props.tag as Array<string>)[0];
    } else {
      tag = props.tag;
    }
    return (
      <Text numberOfLines={1} style={styles.tagStyle}>
        {tag}
      </Text>
    );
  };
  const goDetail = () => {
    console.log(props.navigator);
    props.navigator.navigate('ComicDetail', {
      name: props.title,
      id: props.id,
      author: props.author,
      description: props.description,
    });
  };
  const style = StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
    },
  });
  return (
    <TouchableHighlight
      style={styles.fullImage}
      activeOpacity={0.6}
      underlayColor="rgba(255, 255, 255, 0.3)"
      onPress={goDetail}>
      <ImageBackground style={style.image} source={{uri: props.posterUrl}}>
        {shouldShowTag && badge()}
        <Text numberOfLines={1} style={styles.text}>
          {props.title}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
}

export default ExploreScreen;
