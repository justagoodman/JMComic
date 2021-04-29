package com.jmcomic.ImageUtil;

import android.os.Environment;

import java.io.File;
import java.io.IOException;

public class FileUtil {
    static String  SD_PATH =  Environment.getExternalStorageDirectory().getPath();

    static String APPLICATION_BASE = "/JMComic";

    static String DOWNLOAD_BASE = "/";

    static String getSdPath() {
        return SD_PATH;
    }

    static String getApplicationBase() {
        return SD_PATH + APPLICATION_BASE;
    }

    static String getDownloadBase() {
        return SD_PATH + APPLICATION_BASE + DOWNLOAD_BASE;
    }

    private static void createBaseDir() {
        File dir = new File(SD_PATH + APPLICATION_BASE );
        dir.mkdir();
    }

    public static Boolean createDir(String dirName) {
        if(!isFileOrDirExist(APPLICATION_BASE)) {
            createBaseDir();
        }
        File dir = new File(dirName);
        dir.mkdir();
        return true;
    };

    static Boolean isFileOrDirExist(String fileOrDir) {
        File file = new File(fileOrDir);
        return file.exists();
    }

    static File createFile(String fullPath) throws IOException {
        if(!isFileOrDirExist(APPLICATION_BASE)) {
            createBaseDir();
        }
        if(!fullPath.contains(APPLICATION_BASE)) {
            throw new Error("cannot create file out side application base dir\r\n"
                    + "current dir is " + fullPath);
        }
        File file = new File(fullPath);
        file.createNewFile();
        return file;
    }
}
