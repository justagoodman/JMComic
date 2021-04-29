package com.jmcomic.ImageUtil;

import android.graphics.Bitmap;
import android.graphics.Canvas;

public class ImageScrambler {
    static Bitmap toRaw(Bitmap image) {
        Integer height = image.getHeight();
        Integer width = image.getWidth();
        Integer height_split = height / 10;
        Integer height_remain = height % 10;
        Bitmap[] images = new Bitmap[10];
        for(int i=0; i < 10; i++) {
            /**
             * 裁剪图片
             * @param x   起始x坐标
             * @param y   起始y坐标
             * @param w  要裁剪的图片的宽度
             * @param h  要裁剪的图片的高度
             */
            int y;
            int h;
            if(i==9) {
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


        for(int i=9; i >= 0; i--) {
            int h;
            int y;
            if(i==9) {
                h = height_split + height_remain;
                y = 0 ;
            } else {
                h = height_split;
                y = height_split * (9 - i) + height_remain;
            }
            Bitmap tempImage = images[i];
            canvas.drawBitmap(tempImage, 0, y, null);
        }
        return combined;
    }
}
