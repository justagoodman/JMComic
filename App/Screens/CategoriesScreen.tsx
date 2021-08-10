import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import * as React from 'react';
import API from '../API/BasicRequest';
import {API_ABILITY} from '../API/APIConstant';

function fetchCategories() {
  const url = API_ABILITY.API_CATEGORIES_LIST;
  API.GET(url, {}).then(res => {
    console.log(res);
  });
}

function fetchTag() {
  const url = API_ABILITY.API_COMIC_HOT_TAGS;
  API.GET(url, {}).then(res => {
    console.log(res);
  });
}

function fetchFilterCategories() {
  const url = API_ABILITY.API_CATEGORIES_FILTER_LIST;
  API.GET(url, {
    o: 'mv',
    mv: 5,
    page: 1,
    c: 'human',
  }).then(res => {
    console.log(res);
  });
}
export enum CategorySearchOrder {}
export enum CategorySearchType {}
export interface Category {}
function renderCategories(categories: Category) {
  console.log(categories);
  return <span>text</span>;
}

const globalStyle = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function CategoriesScreen() {
  React.useEffect(() => {
    fetchCategories();
    // fetchTag();
    fetchFilterCategories();
  }, []);
  return (
    <View style={globalStyle.text}>
      <Text>Categories</Text>
    </View>
  );
}

export default CategoriesScreen;
