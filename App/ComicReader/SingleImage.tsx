import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {NativeModules} from 'react-native';
import {getPhotoUrl} from '../API/BasicRequest';
import JMImage from '../Comic/JMImage';

const ScrambleId = 220980;

interface ImageInfo {
  width: number;
  height: number;
  filePath: string;
}

const requestDecodeImage = async (url: string, shouldScramble: boolean) => {
  const imageInfo = await NativeModules.JMImageModule.getImageInfo(
    url,
    shouldScramble,
  )
    .then((data: any) => {
      console.log(data);
      return data;
    })
    .catch((e: any) => {
      console.log(e);
    });
  return imageInfo as ImageInfo;
};

const getHeight = (imageSize: ImageInfo, windowWidth: number) => {
  return (windowWidth / imageSize.width) * imageSize.height;
};

// @ts-ignore
function SingleImage({album, photo}) {
  const {width} = Dimensions.get('window');
  const photo_url = getPhotoUrl(album, photo);
  const [size, setSize] = useState({width: width, height: 500});
  const [filePath, setBase] = useState(
    'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/',
  );
  const style = StyleSheet.create({
    image: {
      width: size.width,
      height: size.height,
    },
  });
  const shouldScramble = parseInt(album) > ScrambleId;
  useEffect(() => {
    requestDecodeImage(photo_url, shouldScramble)
      .then((info) => {
        console.log(album, shouldScramble);
        console.log('scramble image', info);
        info.filePath = 'file://' + info.filePath;
        setBase(info.filePath);
        const height = getHeight(info, width);
        setSize({
          width: width,
          height: height,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [album, photo_url, shouldScramble, width]);
  return (
    <Image
      style={style.image}
      source={{
        isStatic: true,
        uri: filePath,
        width: size.width,
        height: size.height,
      }}
    />
  );
}

export default SingleImage;
