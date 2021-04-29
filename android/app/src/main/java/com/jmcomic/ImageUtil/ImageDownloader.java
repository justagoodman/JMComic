package com.jmcomic.ImageUtil;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;


public class ImageDownloader {

    static Bitmap download(String url) throws Exception {
        //new一个URL对象
        URL url_obj = new URL(url);
        //打开链接
        HttpURLConnection conn = (HttpURLConnection)url_obj.openConnection();
        //设置请求方式为"GET"
        conn.setRequestMethod("GET");
        //超时响应时间为50秒
        conn.setConnectTimeout(5 * 10000);
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36");
        conn.setRequestProperty("referer", "https://18comic.vip/blogs");
        //通过输入流获取图片数据
        InputStream inStream = conn.getInputStream();
        //得到图片的二进制数据，以二进制封装得到数据，具有通用性
        byte[] data = readInputStream(inStream);
        Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
        return bitmap;
    };
    public static byte[] readInputStream(InputStream inStream) throws Exception{
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        //创建一个Buffer字符串
        byte[] buffer = new byte[1024];
        //每次读取的字符串长度，如果为-1，代表全部读取完毕
        int len = 0;
        //使用一个输入流从buffer里把数据读取出来
        while( (len=inStream.read(buffer)) != -1 ){
            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
            outStream.write(buffer, 0, len);
        }
        //关闭输入流
        inStream.close();
        //把outStream里的数据写入内存
        return outStream.toByteArray();
    }
}
