package cc.mrbird.febs.scenic.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.scenic.entity.StayOrder;
import cc.mrbird.febs.scenic.service.IStayOrderService;
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
@RequestMapping("/scenic/stay-order")
@AllArgsConstructor
public class StayOrderController {

    private final IStayOrderService iStayOrderService;

    /**
     * 分页查询
     * @param page
     * @param stayOrder
     * @return
     */
    @GetMapping("/page")
    @ApiOperation(value = "分页查询", notes = "分页查询")
    public R getStayOrderByPage(Page page, StayOrder stayOrder) {
        return R.ok(iStayOrderService.getStayOrderInfoByPage(page,stayOrder));
//        return R.ok(iStayOrderService.page(page, Wrappers.<StayOrder>lambdaQuery()
//                .eq(stayOrder.getStayCode()!=null,StayOrder::getStayCode,stayOrder.getStayCode())
//                .eq(stayOrder.getUserCode()!=null,StayOrder::getUserCode,stayOrder.getUserCode())
//                .eq(stayOrder.getStayStatus()!=null,StayOrder::getStayStatus,stayOrder.getStayStatus())));
    }

    /**
     * 查询所有住宿订单
     * @param stayOrder
     * @return
     */
    @GetMapping("/info/list")
    @ApiOperation(value = "查询所有住宿订单", notes = "查询所有住宿订单")
    public R getStayOrderByList(StayOrder stayOrder) {
        return R.ok(iStayOrderService.list(Wrappers.<StayOrder>lambdaQuery()
                .eq(stayOrder.getStayCode()!=null,StayOrder::getStayCode,stayOrder.getStayCode())
                .eq(stayOrder.getUserCode()!=null,StayOrder::getUserCode,stayOrder.getUserCode())
                .eq(stayOrder.getStayStatus()!=null,StayOrder::getStayStatus,stayOrder.getStayStatus())));
    }

    /**
     * 新增住宿订单
     * @param stayOrder
     * @return
     */
    @PostMapping
    @ApiOperation(value = "新增住宿订单", notes = "新增住宿订单")
    public R save(StayOrder stayOrder) {
        stayOrder.setCode(UUID.randomUUID().toString());
        return  R.ok(iStayOrderService.save(stayOrder));
    }

    /**
     * 修改住宿订单
     * @param stayOrder
     * @return
     */
    @PutMapping
    @ApiOperation(value = "修改住宿订单", notes = "修改住宿订单")
    public R updateById(StayOrder stayOrder) {
        return R.ok(iStayOrderService.updateById(stayOrder));
    }

    /**
     * 删除住宿订单
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    @ApiOperation(value = "删除住宿订单", notes = "删除住宿订单")
    public R deleteById(@PathVariable("ids") List<Integer> ids) {
        return R.ok(iStayOrderService.removeByIds(ids));
    }

}
