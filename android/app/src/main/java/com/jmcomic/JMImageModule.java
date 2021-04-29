package com.jmcomic;

import android.graphics.Bitmap;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.jmcomic.ImageUtil.CacheHelper;
import com.jmcomic.ImageUtil.DownloadThread;

import java.io.FileNotFoundException;
import java.util.Map;
import java.util.HashMap;

public class JMImageModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public JMImageModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @Override
    public String getName() {
        return "JMImageModule";
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void getImageInfo(String url,Boolean shouldScramble, Promise promise) {
        try {
            CacheHelper.ImageInfo info = CacheHelper.getCachedImageByUrl(url);
            if(info == null) {
                DownloadThread thread = new DownloadThread(url, shouldScramble, promise);
                thread.start();
            } else {
                promise.resolve(info.toWritable());
            }
        } catch (Exception e) {
            promise.reject(e);
        }
    }

}