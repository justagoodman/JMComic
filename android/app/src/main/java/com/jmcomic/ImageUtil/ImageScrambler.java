package com.jmcomic.ImageUtil;

import android.graphics.Bitmap;
import android.graphics.Canvas;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

public class ImageScrambler {
    static int charCodeAt(String string) {
        return (int) string.charAt(0);
    }
    static Integer getAlbumIndexFromUrl(String url) {
        String[] args= url.split("/");
        String indexStr = args[args.length - 2];
        Integer index = Integer.parseInt(indexStr);
        return index;
    }
    static String getPhotoIndexFromUrl(String url) {
        String[] args= url.split("/");
        String indexStr = args[args.length - 1].split("\\.")[0];
        return indexStr;
    }
    static Bitmap get_raw (Bitmap bitmap, Integer id, String imgIndex) throws NoSuchAlgorithmException {
        Integer numSplit = getNum(id, imgIndex);
        return toRaw(bitmap, numSplit);
    }
    static Integer getNum (Integer id, String imgIndex) throws NoSuchAlgorithmException {
        Integer a = 10;
        if (id >= 268850) {
            String n_str = id.toString() + imgIndex;
            n_str = MD5.encrypt(n_str);
            n_str = n_str.substring(n_str.length() - 1);
            Integer n = charCodeAt(n_str);
            n = n % 10;
            switch (n) {
                case 0:
                    a = 2;
                    break;
                case 1:
                    a = 4;
                    break;
                case 2:
                    a = 6;
                    break;
                case 3:
                    a = 8;
                    break;
                case 4:
                    a = 10;
                    break;
                case 5:
                    a = 12;
                    break;
                case 6:
                    a = 14;
                    break;
                case 7:
                    a = 16;
                    break;
                case 8:
                    a = 18;
                    break;
                case 9:
                    a = 20;
            }
        }
        return a;
    }
    static Bitmap toRaw(Bitmap image, Integer numSplit) {
        Integer height = image.getHeight();
        Integer width = image.getWidth();
        Integer height_split = height / numSplit;
        Integer height_remain = height % numSplit;
        Bitmap[] images = new Bitmap[numSplit];
        for(int i=0; i < numSplit; i++) {
            /**
             * 裁剪图片
             * @param x   起始x坐标
             * @param y   起始y坐标
             * @param w  要裁剪的图片的宽度
             * @param h  要裁剪的图片的高度
             */
            int y;
            int h;
            if (i == numSplit - 1) {
                h = height_split + height_remain;
                y = height_split * i;
            } else {
                h = height_split;
                y = height_split * i;
            }
            Bitmap temp = Bitmap.createBitmap(image, 0, y, width, h, null, false);;
            images[i] = temp;
        }
        Bitmap combined = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);

        // 拼接图片

        Canvas canvas = new Canvas(combined);


        for(int i=numSplit - 1; i >= 0; i--) {
            int h;
            int y;
            if(i==numSplit - 1) {
                h = height_split + height_remain;
                y = 0 ;
            } else {
                h = height_split;
                y = height_split * (numSplit - 1 - i) + height_remain;
            }
            Bitmap tempImage = images[i];
            canvas.drawBitmap(tempImage, 0, y, null);
        }
        return combined;
    }
}
