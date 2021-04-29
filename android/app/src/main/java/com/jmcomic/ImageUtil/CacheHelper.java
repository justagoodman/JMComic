package com.jmcomic.ImageUtil;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CacheHelper {

    static String  CACHE_BASE_DIR = FileUtil.getApplicationBase() + "/.nomedia/";

    public static class ImageInfo {
        double width;
        double height;
        String filePath;

        public ImageInfo(double width, double height, String filePath) {
            this.width = width;
            this.height = height;
            this.filePath = filePath;
        }

        public WritableMap toWritable() {
            WritableMap map = Arguments.createMap();
            map.putDouble("width", width);
            map.putDouble("height", height);
            map.putString("filePath", filePath);
            return map;
        }
    }

    public static String getCacheBaseDir() {
        return CACHE_BASE_DIR;
    }

    private static String urlToFilename(String url) {
        String pattern = "/media.*jpg";
        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(url);
        String fileName;
        if (m.find( )) {
            fileName = m.group(0);
            fileName = fileName.replace("/", "-");
        } else {
            throw new Error("invalid url, without media.*jpg");
        }
        return fileName;
    }

    static ImageInfo cacheBitMapToFile(Bitmap bitmapToSave, String url) throws IOException {
        if(!FileUtil.isFileOrDirExist(CACHE_BASE_DIR)) {
            FileUtil.createDir(CACHE_BASE_DIR);
        }
        String filename = urlToFilename(url);
        String fullPath = CACHE_BASE_DIR + filename;

        File f1 = FileUtil.createFile(fullPath);
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(f1));
//        ByteBuffer buffer = ByteBuffer.allocate(bitmapToSave.getByteCount());
//        bitmapToSave.copyPixelsToBuffer(buffer);
//        byte[] bytes = buffer.array();
//        bos.write(bytes);
        bitmapToSave.compress(Bitmap.CompressFormat.PNG, 0, bos);
        bos.flush();
        bos.close();
        ImageInfo info = new ImageInfo(bitmapToSave.getWidth(), bitmapToSave.getHeight(), fullPath);
        return info;
    }

    public static ImageInfo getCachedImageByUrl(String url) throws FileNotFoundException {
        String fileName = urlToFilename(url);
        String fullPath = CACHE_BASE_DIR + fileName;
        if(!FileUtil.isFileOrDirExist(fullPath)) {
            return null;
        }
        FileInputStream fs = new FileInputStream(fullPath);

        Bitmap bitmap  = BitmapFactory.decodeStream(fs);

        ImageInfo info = new ImageInfo(bitmap.getWidth(), bitmap.getHeight(), fullPath);

        return info;
    };

    public static ImageInfo getCachedImageByFileName(String fileName) throws FileNotFoundException {
        String fullPath = CACHE_BASE_DIR + fileName;
        if(!FileUtil.isFileOrDirExist(fullPath)) {
            return null;
        }
        FileInputStream fs = new FileInputStream(fullPath);

        Bitmap bitmap  = BitmapFactory.decodeStream(fs);

        ImageInfo info = new ImageInfo(bitmap.getWidth(), bitmap.getHeight(), fullPath);

        return info;
    };
}
