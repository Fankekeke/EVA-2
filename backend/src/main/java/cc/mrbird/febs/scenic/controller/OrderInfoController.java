package cc.mrbird.febs.scenic.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.scenic.entity.OrderInfo;
import cc.mrbird.febs.scenic.service.IOrderInfoService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * @author saber
 */
@RestController
@RequestMapping("/scenic/order-info")
@AllArgsConstructor
public class OrderInfoController {

    private final IOrderInfoService iOrderInfoService;

    /**
     * 分页查询
     * @param page
     * @param orderInfo
     * @return
     */
    @GetMapping("/page")
    @ApiOperation(value = "分页查询", notes = "分页查询")
    public R getOrderByPage(Page page, OrderInfo orderInfo) {
        return R.ok(iOrderInfoService.getOrderInfoByPage(page,orderInfo));
//        return R.ok(iOrderInfoService.page(page, Wrappers.<OrderInfo>lambdaQuery()
//                .eq(orderInfo.getScenicCode()!=null,OrderInfo::getScenicCode,orderInfo.getScenicCode())
//                .eq(orderInfo.getUserCode()!=null,OrderInfo::getUserCode,orderInfo.getUserCode())));
    }

    /**
     * 查询所有订单
     * @param orderInfo
     * @return
     */
    @GetMapping("/info/list")
    @ApiOperation(value = "查询所有订单", notes = "查询所有订单")
    public R getOrderByList(OrderInfo orderInfo) {
        return R.ok(iOrderInfoService.list(Wrappers.<OrderInfo>lambdaQuery()
                .eq(orderInfo.getScenicCode()!=null,OrderInfo::getScenicCode,orderInfo.getScenicCode())
                .eq(orderInfo.getUserCode()!=null,OrderInfo::getUserCode,orderInfo.getUserCode())));
    }

    /**
     * 添加订单
     * @param orderInfo
     * @return
     */
    @PostMapping
    @ApiOperation(value = "添加订单", notes = "添加订单")
    public R save(OrderInfo orderInfo) {
        orderInfo.setCode(UUID.randomUUID().toString());
        return R.ok(iOrderInfoService.save(orderInfo));
    }

    /**
     * 修改订单
     * @param orderInfo
     * @return
     */
    @PutMapping
    @ApiOperation(value = "修改订单", notes = "修改订单")
    public R updateById(OrderInfo orderInfo) {
        return R.ok(iOrderInfoService.updateById(orderInfo));
    }

    /**
     * 删除订单
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    @ApiOperation(value = "删除订单", notes = "删除订单")
    public R deleteById(@PathVariable("ids") List<Integer> ids) {
        return R.ok(iOrderInfoService.removeByIds(ids));
    }

}
