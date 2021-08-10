# JMComic
A third party 18comic app build with ReactNative

Prerelease at Release Page

# todo

- [x] using okhttp to as http client done
- [ ] using thread pool to download image
- [ ] UI


# how to run

`requirements: NDK`

## First: Fresco
`these steps are tring to resolve the problom that when RN displays <Large Image>, fresco will auto down sample the image which make the image low quality`


`special thanks to @clytras`

```
yarn fresco-clone // clone fresco
```
### Go to /android/libraries/fresco

### Add new file named   local.properties

### Content surposed to be
```
ndk.dir=<Path to NDK>  ## such as E:\\NDK\\android-ndk-r21e
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
```

### Find file at fresco
`/android/libraries/fresco/imagepipline/src/main/java/producers/DecodeProducer.java`

### Find method <ProgressiveDecoder> at DecodeProducer.java

``` java
JobRunnable job =
          new JobRunnable() {
            @Override
            public void run(EncodedImage encodedImage, @Status int status) {
              if (encodedImage != null) {
                if (mDownsampleEnabled || !statusHasFlag(status, Consumer.IS_RESIZING_DONE)) {
                  ImageRequest request = producerContext.getImageRequest();
                  if (mDownsampleEnabledForNetwork
                      || !UriUtil.isNetworkUri(request.getSourceUri())) {
                    encodedImage.setSampleSize(
                        DownsampleUtil.determineSampleSize(
                            request.getRotationOptions(),
                            request.getResizeOptions(),
                            encodedImage,
                            maxBitmapSize));
                  }
                }

                if (producerContext
                    .getImagePipelineConfig()
                    .getExperiments()
                    .shouldDownsampleIfLargeBitmap()) {
                  maybeIncreaseSampleSize(encodedImage);
                }

                doDecode(encodedImage, status);
              }
            }
          };
```

### Change it
``` java
JobRunnable job =
          new JobRunnable() {
            @Override
            public void run(EncodedImage encodedImage, @Status int status) {
            //   if (encodedImage != null) {
            //     if (mDownsampleEnabled || !statusHasFlag(status, Consumer.IS_RESIZING_DONE)) {
            //       ImageRequest request = producerContext.getImageRequest();
            //       if (mDownsampleEnabledForNetwork
            //           || !UriUtil.isNetworkUri(request.getSourceUri())) {
            //         encodedImage.setSampleSize(
            //             DownsampleUtil.determineSampleSize(
            //                 request.getRotationOptions(),
            //                 request.getResizeOptions(),
            //                 encodedImage,
            //                 maxBitmapSize));
            //       }
            //     }

            //     if (producerContext
            //         .getImagePipelineConfig()
            //         .getExperiments()
            //         .shouldDownsampleIfLargeBitmap()) {
            //       maybeIncreaseSampleSize(encodedImage);
            //     }

                doDecode(encodedImage, status);
              }
            }
          };
```

## Second: install dependency
```
yarn install
```

## Third: start project
```
yarn android
```


## Fouth: release
```
npm run fresco-clean
cd android
gradlew bundleRelease
```