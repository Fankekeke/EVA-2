package cc.mrbird.febs.scenic.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.scenic.entity.StayInfo;
import cc.mrbird.febs.scenic.service.IStayInfoService;
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
@RequestMapping("/scenic/stay-info")
@AllArgsConstructor
public class StayInfoController {

    private final IStayInfoService iStayInfoService;


    /**
     * 分页查询
     * @param page
     * @param stayInfo
     * @return
     */
    @GetMapping("/page")
    @ApiOperation(value = "分页查询", notes = "分页查询")
    public R getStayByPage(Page page, StayInfo stayInfo) {
        return R.ok(iStayInfoService.page(page, Wrappers.<StayInfo>lambdaQuery()
                .like(stayInfo.getStayName()!=null,StayInfo::getStayName,stayInfo.getStayName())
                .like(stayInfo.getStayAddress()!=null,StayInfo::getStayAddress,stayInfo.getStayAddress())));
    }

    /**
     * 查询所有住宿点
     * @param stayInfo
     * @return
     */
    @GetMapping("/info/list")
    @ApiOperation(value = "查询所有住宿点", notes = "查询所有住宿点")
    public R getStayByList(StayInfo stayInfo) {
        return R.ok(iStayInfoService.list(Wrappers.<StayInfo>lambdaQuery()
                .like(stayInfo.getStayName()!=null,StayInfo::getStayName,stayInfo.getStayName())
                .like(stayInfo.getStayAddress()!=null,StayInfo::getStayAddress,stayInfo.getStayAddress())));
    }

    /**
     * 添加住宿点
     * @param stayInfo
     * @return
     */
    @PostMapping
    @ApiOperation(value = "添加住宿点", notes = "添加住宿点")
    public R save(StayInfo stayInfo) {
        stayInfo.setCode(UUID.randomUUID().toString());
        return R.ok(iStayInfoService.save(stayInfo));
    }

    /**
     * 修改住宿点
     * @param stayInfo
     * @return
     */
    @PutMapping
    @ApiOperation(value = "修改住宿点", notes = "修改住宿点")
    public R updateById(StayInfo stayInfo) {
        return R.ok(iStayInfoService.updateById(stayInfo));
    }

    /**
     * 删除住宿点
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    @ApiOperation(value = "删除住宿点", notes = "删除住宿点")
    public R deleteById(@PathVariable("ids") List<Integer> ids) {
        return R.ok(iStayInfoService.removeByIds(ids));
    }
}
