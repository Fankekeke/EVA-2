package cc.mrbird.febs.common.utils;

import cc.mrbird.febs.scenic.entity.IdCard;
import cc.mrbird.febs.scenic.entity.UserInfo;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.UnsupportedEncodingException;
import java.net.URL;

/**
 * 身份证信息服务接口类
 * @author wangxw
 * @version 1.0
 * @date Jul 11, 2014 10:49:57 AM
 */
public class IdCardService {

    /**
     * 生成身份证信息
     * @param cardNo
     * @return 返回身份证信息
     * @throws UnsupportedEncodingException
     */
    public static String getIdCardDetail(String cardNo, UserInfo usersn) throws UnsupportedEncodingException{
        // 获取身份证信息
        IdCard idcard = getIdCardInfo(cardNo);

        // 存储文本信息
        StringBuffer news = new StringBuffer();

        if (idcard != null) {
            usersn.setAddress(idcard.getAtt());
            usersn.setBorn(idcard.getBorn());
            usersn.setSex((idcard.getSex() == null || idcard.getSex().equals('男') ? 1 : 0));
            news.append("身份证号码:"+idcard.getIdCard()).append("\n");
            news.append("所属地区:"+idcard.getAtt()).append("\n");
            news.append("出生日期:"+idcard.getBorn()).append("\n");
            news.append("性别:"+idcard.getSex()).append("\n");
        }

        if(news.length() == 0){
            news.append("身份证号码").append(cardNo).append("不存在,请重新输入!");
        }

        return news.toString();
    }

    /**
     * 获取身份证信息
     * @param cardNo
     * @return 返回身份证信息
     */
    public static IdCard getIdCardInfo(String cardNo){
        URL url = null;
        IdCard idCard = new IdCard();
        try{
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();

            url = new URL("http://api.k780.com:88/?app=idcard.get&idcard="+cardNo+"&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=xml");

            System.out.println(url);

            Document doc = builder.parse(url.openStream());
            NodeList node = doc.getElementsByTagName("result");

            for(int i=0;i<node.getLength();i++){
                String idcard = "";
                String born = "";
                String sex = "";
                String att = "";
                if(doc.getElementsByTagName("idcard").item(i).getFirstChild() != null){
                    idcard = doc.getElementsByTagName("idcard").item(i).getFirstChild().getNodeValue();
                }
                if(doc.getElementsByTagName("born").item(i).getFirstChild() != null){
                    born = doc.getElementsByTagName("born").item(i).getFirstChild().getNodeValue();
                }
                if(doc.getElementsByTagName("sex").item(i).getFirstChild() != null){
                    sex = doc.getElementsByTagName("sex").item(i).getFirstChild().getNodeValue();
                }
                if(doc.getElementsByTagName("att").item(i).getFirstChild() != null){
                    att = doc.getElementsByTagName("att").item(i).getFirstChild().getNodeValue();
                }
                idCard.setIdCard(idcard);
                idCard.setBorn(born);
                idCard.setSex(sex);
                idCard.setAtt(att);
            }

        }catch(Exception e){
            e.printStackTrace();
        }
        return idCard;
    }

    public static String getIdCardDetail(String cardNo) throws UnsupportedEncodingException{
        // 获取身份证信息
        IdCard idcard = getIdCardInfo(cardNo);

        // 存储文本信息
        StringBuffer news = new StringBuffer();

        if (idcard != null) {
            news.append("身份证号码:"+idcard.getIdCard()).append("\n");
            news.append("所属地区:"+idcard.getAtt()).append("\n");
            news.append("出生日期:"+idcard.getBorn()).append("\n");
            news.append("性别:"+idcard.getSex()).append("\n");
        }

        if(news.length() == 0){
            news.append("身份证号码").append(cardNo).append("不存在,请重新输入!");
        }

        return news.toString();
    }

    public static void main(String[] args){

    }

}
