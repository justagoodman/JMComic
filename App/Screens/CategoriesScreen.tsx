import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, Header, Text} from 'react-native-elements';
import * as React from 'react';
import API, {getAlbumPosterUrl} from '../API/BasicRequest';
import {API_ABILITY} from '../API/APIConstant';
import {ComicListItem} from './ExploreScreen';
import {primary} from '../Theme';

const gap = 8;

const {width} = Dimensions.get('window');
const itemWidth = (width - 2 * gap) / 3;
const itemHeight = (itemWidth * 4) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 4,
  },
  image: {
    width: '33.33333%',
    resizeMode: 'contain',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginBottom: 4,
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
export function ComicBlock({navigator, comics}): React.ReactElement {
  return (
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
  );
}

function fetchFilterCategories(filter, pageNo = 1) {
  const url = API_ABILITY.API_CATEGORIES_FILTER_LIST;
  return API.GET(url, {
    o: '',
    mv: 5,
    page: pageNo,
    c: filter.value,
  }).then(res => {
    console.log('filter', res);
    return res.content;
  });
}
export enum CategorySearchOrder {}
export enum CategorySearchType {}
export interface Category {}

const globalStyle = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 12,
  },
  title: {
    fontSize: 12,
  },
  header: {
    marginTop: 32,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
  },
});

function CategoriesScreen(props): React.ReactElement {
  const defaultFilters = [
    {
      label: '最新',
      value: 0,
    },
    {
      label: '同人',
      value: 'doujin',
    },
    {
      label: '单本',
      value: 'single',
    },
    {
      label: '短篇',
      value: 'short',
    },
    {
      label: '其他',
      value: 'another',
    },
    {
      label: '韩漫',
      value: 'hanman',
    },
    {
      label: '美漫',
      value: 'meiman',
    },
    {
      label: 'Cosplay',
      value: 'doujin_cosplay',
    },
    {
      label: '3D',
      value: '3D',
    },
  ];
  const [filter, setFilter] = React.useState(defaultFilters[0]);
  const [comics, setComics] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);
  function _onScroll(evt) {
    const event = evt['nativeEvent'];

    // 如果拖拽值超过底部50，且当前的scrollview高度大于屏幕高度，则加载更多
    const _num = event['contentSize']['height'] - event['contentOffset']['y'];
    const verlocity = event.velocity.y;

    console.log(verlocity, _num);
    if (verlocity && _num < 600) {
      setPageNo(pageNo + 1);
    }
  }
  console.log(filter);
  React.useEffect(() => {
    // fetchCategories();
    // fetchTag();
    console.log(filter, pageNo);
    fetchFilterCategories(filter, pageNo).then(data => {
      console.log(data);
      data.forEach((item: ComicPosterProps) => {
        item.image = getAlbumPosterUrl(item.id);
      });
      setComics([...comics.slice(), ...data]);
    });
  }, [filter, pageNo]);
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
      <View style={globalStyle.header}>
        {defaultFilters.map(item => (
          <Button
            title={item.label}
            key={item.value}
            style={globalStyle.textItem}
            type="clear"
            titleStyle={globalStyle.title}
            onPress={() => {
              setFilter(item);
              setPageNo(1);
              setComics([]);
            }}
          />
        ))}
      </View>
      <ScrollView onScroll={_onScroll}>
        <ComicBlock comics={comics} navigator={props.navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoriesScreen;
