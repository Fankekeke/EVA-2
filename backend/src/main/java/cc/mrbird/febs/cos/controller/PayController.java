package cc.mrbird.febs.cos.controller;

import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.*;
import cc.mrbird.febs.cos.service.IOrderInfoService;
import cc.mrbird.febs.cos.service.IScenicOrderService;
import cc.mrbird.febs.cos.service.IUserInfoService;
import cc.mrbird.febs.cos.service.PayService;
import cn.hutool.core.date.DateUtil;
import com.alipay.api.AlipayApiException;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/cos/pay")
public class PayController {

    @Autowired
    private PayService payService;

    @Autowired
    private IUserInfoService userInfoService;

    @Autowired
    private IScenicOrderService scenicOrderService;

    @Autowired
    private IOrderInfoService orderInfoService;

    @GetMapping("/payOverBack")
    public void payOverBack(String message) {
        System.out.println(message);
    }

    /**
     * 订单支付状态修改
     * @param orderCode
     * @return
     */
    @GetMapping("/orderAudit")
    public R audit(String orderCode) {
        // 判断订单所属
        ScenicOrder scenicOrder = scenicOrderService.getOne(Wrappers.<ScenicOrder>lambdaQuery().eq(ScenicOrder::getCode, orderCode));
        if (scenicOrder != null) {
            scenicOrder.setDelFlag(0);
            return R.ok(scenicOrderService.updateById(scenicOrder));
        }
        OrderInfo orderInfo = orderInfoService.getOne(Wrappers.<OrderInfo>lambdaQuery().eq(OrderInfo::getCode, orderCode));
        if (orderInfo != null) {
            orderInfo.setDelFlag(0);
            return R.ok(orderInfoService.updateById(orderInfo));
        }
        return R.ok(false);
    }

    /**
     * 景点订单支付
     * @param scenicOrder
     * @return
     */
    @PostMapping("/scenic")
    public R scenicAlipay(ScenicOrder scenicOrder) throws AlipayApiException {
        UserInfo userInfo = userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, scenicOrder.getUserId()));
        scenicOrder.setUserId(userInfo.getId());
        scenicOrder.setCode("ORD-" + System.currentTimeMillis());
        scenicOrder.setOrderStatus(1);
        scenicOrder.setCreateDate(DateUtil.formatDateTime(new Date()));
        scenicOrder.setDelFlag(1);
        scenicOrderService.save(scenicOrder);
        // 支付
        AlipayBean alipayBean = new AlipayBean();
        alipayBean.setOut_trade_no(scenicOrder.getCode());
        alipayBean.setSubject("景区门票");
        alipayBean.setTotal_amount(scenicOrder.getPrice().toString());
        alipayBean.setBody("景区门票");
        String result = payService.aliPay(alipayBean);
        return R.ok(result);
    }

    /**
     * 房间订单支付
     * @param orderInfo
     * @return
     * @throws AlipayApiException
     */
    @PostMapping("/room")
    public R roomAlipay(OrderInfo orderInfo) throws AlipayApiException {
        UserInfo userInfo = userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, orderInfo.getUserId()));
        orderInfo.setUserId(userInfo.getId());
        orderInfo.setCode("ORD-" + System.currentTimeMillis());
        orderInfo.setOrderStatus(1);
        orderInfo.setCreateDate(DateUtil.formatDateTime(new Date()));
        orderInfo.setDelFlag(1);
        orderInfo.setStartDate(DateUtil.formatDate(new Date()));
        orderInfo.setEndDate(DateUtil.formatDate(DateUtil.offsetDay(new Date(), 3)));
        orderInfoService.save(orderInfo);
        // 支付
        AlipayBean alipayBean = new AlipayBean();
        alipayBean.setOut_trade_no(orderInfo.getCode());
        alipayBean.setSubject("房间价格");
        alipayBean.setTotal_amount(orderInfo.getPrice().toString());
        alipayBean.setBody("房间价格");
        String result = payService.aliPay(alipayBean);
        return R.ok(result);
    }

    /**
     * 阿里支付
     * @param subject
     * @param body
     * @return
     * @throws AlipayApiException
     */
    @PostMapping(value = "/alipay")
    public R alipay(String outTradeNo, String subject, String totalAmount, String body) throws AlipayApiException {
        AlipayBean alipayBean = new AlipayBean();
        alipayBean.setOut_trade_no(outTradeNo);
        alipayBean.setSubject(subject);
        alipayBean.setTotal_amount(totalAmount);
        alipayBean.setBody(body);
        String result = payService.aliPay(alipayBean);
        return R.ok(result);
    }

}
