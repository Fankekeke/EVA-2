package cc.mrbird.febs.common.utils;

import java.util.Date;

public class FileNameUtils {

    /**
     * 获取文件后缀
     * @param fileName
     * @return
     */
    public static String getSuffix(String fileName){
        return fileName.substring(fileName.lastIndexOf("."));
    }

    /**
     * 生成新的文件名
     * @param fileOriginName 源文件名
     * @return
     */
    public static String getFileName(String fileOriginName){
        return ("SA" + System.currentTimeMillis() + FileNameUtils.getSuffix(fileOriginName));
    }

    /**
     * 生成新的文件名
     * @param fileOriginName 源文件名
     * @return
     */
    public static String getFileNameByVideo(String fileOriginName){
        return ("OA" + System.currentTimeMillis() + FileNameUtils.getSuffix(fileOriginName));
    }

    /**
     * 生成新的文件名
     * @param fileOriginName
     * @return
     */
    public static String getFileNameByZip(String fileOriginName) {
        return ("7Z" + System.currentTimeMillis() + FileNameUtils.getSuffix(fileOriginName));
    }


}

