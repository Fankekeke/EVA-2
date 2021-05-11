package cc.mrbird.febs.common.utils;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

public class email {
    // 发件人的 邮箱 和 密码
    //PS: 某些邮箱服务器为了增加邮箱本身密码的安全性，给 SMTP 客户端设置了独立密码（有的邮箱称为“授权码”）, 对于开启了独立密码的邮箱, 这里的邮箱密码必需使用这个独立密码（授权码）。
    private static String myEmailAccount = "2911572013@qq.com";
    private static String myEmailPsw = "bylvzvmhhsmedgaf";//yonyivmzpseddeae
    //QQSMTP服务器地址为:smtp.qq.com
    private static String myEmailSMTPHost = "smtp.qq.com";

    public static void sendEmail(String loginNum,String receiveMailAccount) throws Exception {
        // 1. 创建参数配置, 用于连接邮件服务器的参数配置(一般写在一个Properties文件里来读取，此处为了方便)
        Properties props = new Properties();
        props.setProperty("mail.transport.protocol", "smtp");//使用协议(javaMail规范要求)
        props.setProperty("mail.smtp.host", myEmailSMTPHost);//发件人的邮箱的SMTP服务器地址
        props.setProperty("mail.smtp.auth", "true");//需要请求认证
        props.setProperty("mail.smtp.port", "465");             //google使用465或587端口
        props.setProperty("mail.debug", "true");      //开启调试模式
        props.setProperty("mail.smtp.starttls.enable", "true");//使用 STARTTLS安全连接
        props.setProperty("mail.smtp.socketFactory.port", "465");

        //2. 根据配置创建会话对象，用于和邮件服务器交互
        Session session = Session.getInstance(props);
        session.setDebug(true);//设置为debug模式，可以查看详细的发送Log

        //3.创建一封邮件
        MimeMessage message = createMimeMessage(session, myEmailAccount, receiveMailAccount,loginNum);

        //4.根据Session获取邮件传输对象
        Transport transport = session.getTransport();

        // 5. 使用 邮箱账号 和 密码 连接邮件服务器, 这里认证的邮箱必须与 message 中的发件人邮箱一致, 否则报错
        transport.connect(myEmailAccount, myEmailPsw);

        // 6. 发送邮件, 发到所有的收件地址, message.getAllRecipients() 获取到的是在创建邮件对象时添加的所有收件人, 抄送人, 密送人
        transport.sendMessage(message, message.getAllRecipients());

        // 7. 关闭连接
        transport.close();
    }

    /**
     * 创建一封只包含文本的简单邮件
     *
     * @param session 和服务器交互的会话
     * @param sendMail 发件人邮箱
     * @param receiveMail 收件人邮箱
     * @return
     * @throws Exception
     */
    public static MimeMessage createMimeMessage(Session session, String sendMail, String receiveMail,String loginNum) throws Exception {

        // 1. 创建一封邮件
        MimeMessage message = new MimeMessage(session);

        // 2. From: 发件人（昵称有广告嫌疑，避免被邮件服务器误认为是滥发广告以至返回失败，请修改昵称）
        // InternetAddress(String address, String personal, String charset) 根据地址和名称来构建InternetAddress
        message.setFrom(new InternetAddress(sendMail, "悲伤的桔子树", "UTF-8"));

        // 3. To: 收件人（可以增加多个收件人、抄送、密送）
        message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(receiveMail, "(｡･∀･)ﾉﾞ嗨SIRI", "UTF-8"));
        // 4. Subject: 邮件主题（标题有广告嫌疑，避免被邮件服务器误认为是滥发广告以至返回失败，请修改标题）

        message.setSubject("恭喜", "UTF-8");

        // 5. Content: 邮件正文（可以使用html标签）（内容有广告嫌疑，避免被邮件服务器误认为是滥发广告以至返回失败，请修改发送内容）
        message.setContent("尊敬的悲伤的橘子树:<br/>   当您看到这封邮箱时,现在时间为:"+new Date()+",你的验证码为"+loginNum+"", "text/html;charset=utf-8");

        // 6. 设置发件时间
        message.setSentDate(new Date());

        // 7. 保存设置
        message.saveChanges();

        return message;

    }}
