package cc.mrbird.febs.scenic.controller;

import cc.mrbird.febs.common.utils.IdCardService;
import cc.mrbird.febs.common.utils.MD5Util;
import cc.mrbird.febs.common.utils.email;
import cc.mrbird.febs.common.utils.getComputer;
import cc.mrbird.febs.scenic.entity.*;
import cc.mrbird.febs.scenic.service.*;
import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Controller
@RequestMapping("/web")
@AllArgsConstructor
public class webController {

    private final IOrderInfoService iOrderInfoService;

    private final IScenicInfoService iScenicInfoService;

    private final IStayInfoService iStayInfoService;

    private final IStayOrderService iStayOrderService;

    private final IQuestionInfoService iQuestionInfoService;

    private final IUserInfoService iUserInfoService;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 页面跳转
     * @param
     * @return
     */
    @RequestMapping("/salesshow.html")
    public String showPage() {
        return "salesshow";
    }

    @RequestMapping(value="index.html",method = RequestMethod.GET)
    public String goIndex(Model model) {
        Page page = new Page();
        page.setSize(15);
        model.addAttribute("scenicList", iScenicInfoService.page(page, Wrappers.<ScenicInfo>lambdaQuery()));

        Page page1 = new Page();
        page1.setSize(5);
        model.addAttribute("questList", iQuestionInfoService.page(page1, Wrappers.<QuestionInfo>lambdaQuery()));
        return "index";
    }

    @RequestMapping("scenicInfo.html")
    public String goScenicInfo(@RequestParam Integer id,Model model) {
        model.addAttribute("scenicInfo", iScenicInfoService.getById(id));
        return "scenicInfo";
    }

    @RequestMapping("travelLists.html")
    public String goTravel(@RequestParam Integer pageNo,Model model) {
        Page pagehelper = new Page();
        pagehelper.setCurrent(pageNo);
        pagehelper.setSize(5);
        model.addAttribute("questList", iQuestionInfoService.page(pagehelper,Wrappers.<QuestionInfo>lambdaQuery()));
        return "travelLists";
    }

    @RequestMapping("questionInfo.html/{id}")
    public String goQuestionInfo(@PathVariable Integer id,Model model) {
        model.addAttribute("questionInfo", iQuestionInfoService.getById(id));
        return "questionInfo";
    }

    @RequestMapping("goods.html/{scenic}")
    public String goGoods(@PathVariable(value = "scenic",required=false ) String scenic,Model model) {
        Page page = new Page();
        page.setSize(5);
        page.setCurrent(6);
        model.addAttribute("scenicTop", iScenicInfoService.page(page,Wrappers.<ScenicInfo>lambdaQuery()));
        if(scenic != null || scenic != "") {
            Page page1 = new Page();
            page1.setSize(20);
            System.out.println(JSON.toJSON(iScenicInfoService.page(page1,Wrappers.<ScenicInfo>lambdaQuery().like(ScenicInfo::getScenicName,scenic).or().like(ScenicInfo::getAddress,scenic))));
            model.addAttribute("scenicList", iScenicInfoService.page(page1,Wrappers.<ScenicInfo>lambdaQuery().like(ScenicInfo::getScenicName,scenic).or().like(ScenicInfo::getAddress,scenic)));
        }else {
            Page page2 = new Page();
            page2.setSize(20);
            model.addAttribute("scenicList", iScenicInfoService.page(page2,Wrappers.<ScenicInfo>lambdaQuery()));
        }
        return "goods";
    }

    @RequestMapping("hotelView.html")
    public String goHotel(@RequestParam Integer pageNo,Model model) {
        Page page = new Page();
        page.setCurrent(pageNo);
        page.setSize(4);
        model.addAttribute("stayList", iStayInfoService.page(page,Wrappers.<StayInfo>lambdaQuery()));
        return "hotelView";
    }

    @RequestMapping("stayInfo.html")
    public String goStayInfo(@RequestParam Integer id,Model model) {
        model.addAttribute("stayInfo", iStayInfoService.getById(id));
        return "stayInfo";
    }

    @ResponseBody
    @RequestMapping(value = "sendEmail", method = RequestMethod.GET)
    public void sendEmail(String userName, HttpSession session) {
        //创建验证码
        String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder(4);

        for (int i = 0; i < 4; i++) {
            char ch = str.charAt(new Random().nextInt(str.length()));
            sb.append(ch);
        }
        try {
            session.setAttribute("emailNum",sb.toString());
            email.sendEmail(sb.toString(), userName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "addUsersave.html", method = RequestMethod.POST)
    public String addSaveMail(String email, String uname, String pwd, String idcard, String verify, String ipAddress, HttpSession session, HttpServletRequest request) {
        if(verify.equals(session.getAttribute("emailNum"))) {
            UserInfo userInfo = new UserInfo();
            userInfo.setEmail(email);
            userInfo.setName(uname);
            userInfo.setIpAddress(ipAddress);
            userInfo.setPwd(MD5Util.encrypt(pwd));
            userInfo.setIdcard(idcard);
            try {
                IdCardService.getIdCardDetail(idcard, userInfo);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            getComputer.getHost(userInfo);
            userInfo.setCode(UUID.randomUUID().toString());
            iUserInfoService.save(userInfo);
            return "register_success";
        }
        request.setAttribute("error", "验证码错误");
        return "register";

    }
    @ResponseBody
    @RequestMapping(value = "addOrder", method = RequestMethod.GET)
    public boolean addOrder(String userCode,String scenicCode,Integer scenicNum) {
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setIsUse(0);
        orderInfo.setOrderNum(scenicNum);
        orderInfo.setScenicCode(scenicCode);
        orderInfo.setUserCode(userCode);
        orderInfo.setOrderDate(dateFormat.format(new Date()));
        return iOrderInfoService.save(orderInfo);
    }

    @ResponseBody
    @RequestMapping(value = "addStayOrder", method = RequestMethod.GET)
    public boolean addStayOrder(String userCode,String stayCode,Integer stayNum,Integer stayDay) {
        StayOrder stayOrder = new StayOrder();
        stayOrder.setStayStatus(0);
        stayOrder.setStayCode(stayCode);
        stayOrder.setStayDay(stayDay);
        stayOrder.setUserCode(userCode);
        stayOrder.setStayDate(dateFormat.format(new Date()));
        stayOrder.setStayNum(stayNum);
        return iStayOrderService.save(stayOrder);
    }

    @RequestMapping(value = "dologin.html", method = RequestMethod.POST)
    public String doLogin(String userName, String userPwd, HttpSession session,
                          HttpServletRequest request) {
        UserInfo userInfo = iUserInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getEmail,userName).eq(UserInfo::getPwd,MD5Util.encrypt(userPwd)));
        System.out.println(JSON.toJSON(userInfo));
        if(userInfo != null) {
            session.setAttribute("user",userInfo);
            session.setMaxInactiveInterval(3600);

            Page page = new Page();
            page.setSize(100);
            OrderInfo orderInfo = new OrderInfo();
            orderInfo.setUserCode(userInfo.getCode());
            session.setAttribute("scenicLists",iOrderInfoService.getOrderByUser(page, orderInfo));
            return "redirect:/web/index.html";
        }else {
            request.setAttribute("error", "密码错误了哦");
            return "login";
        }

    }

    @RequestMapping("login.html")
    public String goLogin(HttpSession session) {
        if (session.getAttribute("user") != null) {
            return "redirect:/web/index.html";
        }
        return "login";
    }

    @RequestMapping("addUser.html")
    public String goRegister() {
        return "register";
    }

    @RequestMapping(value = "getOrder.html", method = RequestMethod.GET)
    public String goOrderInfo(HttpSession session,Model model) {
        UserInfo userInfo = (UserInfo)session.getAttribute("user");
        Page page = new Page();
        page.setSize(100);

        //model.addAttribute("scenicLists", iOrderInfoService.getOrderByUser(page, orderInfo));
        StayOrder stayOrder = new StayOrder();
        stayOrder.setUserCode(userInfo.getCode());
        model.addAttribute("stayOrderList", iStayOrderService.getStatOrderByUser(page, stayOrder));
        //session.setAttribute("stayOrderList",iStayOrderService.getStatOrderByUser(page, stayOrder));
        return "orderInfo";
    }


}
