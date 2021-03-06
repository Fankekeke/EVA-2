package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.ScenicOrder;
import cc.mrbird.febs.cos.entity.UserInfo;
import cc.mrbird.febs.cos.service.IScenicInfoService;
import cc.mrbird.febs.cos.service.IScenicOrderService;
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
@RequestMapping("/cos/scenic-order")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ScenicOrderController {

    private final IScenicOrderService scenicOrderService;

    private final IUserInfoService userInfoService;

    /**
     * 分页查询景点订单
     * @param page
     * @param scenicOrder
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, ScenicOrder scenicOrder) {
        if (scenicOrder.getUserId() != null) {
            UserInfo userInfo = userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, scenicOrder.getUserId()));
            scenicOrder.setUserId(userInfo.getId());
        }
        return R.ok(scenicOrderService.scenicInfoByPage(page, scenicOrder));
    }

    /**
     * 订单销票
     * @param orderId
     * @return
     */
    @GetMapping("/editStatus")
    public R editStatus(Integer orderId) {
        return R.ok(scenicOrderService.update(Wrappers.<ScenicOrder>lambdaUpdate().set(ScenicOrder::getOrderStatus, 2).eq(ScenicOrder::getId, orderId)));
    }

    /**
     * 添加景区订单
     * @param scenicOrder
     * @return
     */
    @PostMapping
    public R save(ScenicOrder scenicOrder) {
        return R.ok(scenicOrderService.save(scenicOrder));
    }

    /**
     * 修改景区订单
     * @param scenicOrder
     * @return
     */
    @PutMapping
    public R edit(ScenicOrder scenicOrder) {
        return R.ok(scenicOrderService.updateById(scenicOrder));
    }

    /**
     * 删除景区订单
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(scenicOrderService.removeByIds(ids));
    }

}
