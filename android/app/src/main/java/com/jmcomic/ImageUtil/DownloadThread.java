package com.jmcomic.ImageUtil;

import android.graphics.Bitmap;
import android.graphics.ImageDecoder;
import android.util.Log;

import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.jmcomic.ImageUtil.ImageScrambler;

import java.io.IOException;

public class DownloadThread {
    private final String url;
    private final Promise promise;
    private final Boolean shouldScramble;
    private CacheHelper cacheHelper;

    public DownloadThread(String url, Boolean shouldScramble, Promise promise, CacheHelper cacheHelper) {
        this.url = url;
        this.promise = promise;
        this.shouldScramble = shouldScramble;
        this.cacheHelper = cacheHelper;
    }


    public void internalRun() {
        try {
            Bitmap image = ImageDownloader.download(url);
            if (image == null) {
                throw new IOException();
            }
            if (shouldScramble) {
                image = ImageScrambler.get_raw(image, ImageScrambler.getAlbumIndexFromUrl(url), ImageScrambler.getPhotoIndexFromUrl(url));
            }
            CacheHelper.ImageInfo info = cacheHelper.cacheBitMapToFile(image, url);
            WritableMap map = info.toWritable();
            promise.resolve(map);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

    public void start() {
        new Thread(new Runnable() {
            public void run() {
                internalRun();
            }
        }).start();
    }
}
