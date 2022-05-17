package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.OrderInfo;
import cc.mrbird.febs.cos.entity.UserInfo;
import cc.mrbird.febs.cos.service.IOrderInfoService;
import cc.mrbird.febs.cos.service.IUserInfoService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author FanK
 */
@RestController
@RequestMapping("/cos/order-info")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class OrderInfoController {

    private final IOrderInfoService orderInfoService;

    private final IUserInfoService userInfoService;

    /**
     * 主页信息
     * @return
     */
    @GetMapping("/home")
    public R home(Integer type, Integer userId) {
        return R.ok(orderInfoService.home(type, userId));
    }

    /**
     *
     * @param id
     * @return
     */
    @GetMapping("/audit")
    public R audit(Integer id) {
        return R.ok(orderInfoService.update(Wrappers.<OrderInfo>lambdaUpdate().set(OrderInfo::getOrderStatus, 1).eq(OrderInfo::getId, id)));
    }

    /**
     * 分页查询订单信息
     * @param page
     * @param orderInfo
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, OrderInfo orderInfo) {
        if (orderInfo.getUserId() != null) {
            UserInfo userInfo = userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, orderInfo.getUserId()));
            if (userInfo != null) {
                orderInfo.setUserId(userInfo.getId());
            }
        }
        return R.ok(orderInfoService.orderInfoByPage(page, orderInfo));
    }

    /**
     * 添加订单
     * @param orderInfo
     * @return
     */
    @PostMapping
    public R save(OrderInfo orderInfo) {
        return R.ok(orderInfoService.save(orderInfo));
    }

    /**
     * 删除订单信息
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(orderInfoService.removeByIds(ids));
    }

}
