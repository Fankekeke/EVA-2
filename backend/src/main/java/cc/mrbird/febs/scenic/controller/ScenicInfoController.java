package cc.mrbird.febs.scenic.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.scenic.entity.ScenicInfo;
import cc.mrbird.febs.scenic.service.IScenicInfoService;
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
@RequestMapping("/scenic/info")
@AllArgsConstructor
public class ScenicInfoController {

    private final IScenicInfoService iScenicInfoService;

    /**
     * 分页查询
     * @param page
     * @param scenicInfo
     * @return
     */
    @GetMapping("/page")
    @ApiOperation(value = "分页查询", notes = "分页查询")
    public R getScenicByPage(Page page, ScenicInfo scenicInfo) {
        return R.ok(iScenicInfoService.page(page, Wrappers.<ScenicInfo>lambdaQuery()
                .like(scenicInfo.getAddress()!=null,ScenicInfo::getAddress,scenicInfo.getAddress())
                .like(scenicInfo.getScenicName()!=null,ScenicInfo::getScenicName,scenicInfo.getScenicName())));
    }

    /**
     * 查询所有景点
     * @param scenicInfo
     * @return
     */
    @GetMapping("/info/list")
    @ApiOperation(value = "查询所有景点", notes = "查询所有景点")
    public R getScenicByList(ScenicInfo scenicInfo) {
        return R.ok(iScenicInfoService.list(Wrappers.<ScenicInfo>lambdaQuery()
                .like(scenicInfo.getAddress()!=null,ScenicInfo::getAddress,scenicInfo.getAddress())
                .like(scenicInfo.getScenicName()!=null,ScenicInfo::getScenicName,scenicInfo.getScenicName())));
    }

    /**
     * 添加景点
     * @param scenicInfo
     * @return
     */
    @PostMapping
    @ApiOperation(value = "添加景点", notes = "添加景点")
    public R save(ScenicInfo scenicInfo) {
        scenicInfo.setCode(UUID.randomUUID().toString());
        return R.ok(iScenicInfoService.save(scenicInfo));
    }

    /**
     * 修改景点
     * @param scenicInfo
     * @return
     */
    @PutMapping
    @ApiOperation(value = "修改景点", notes = "修改景点")
    public R updateById(ScenicInfo scenicInfo) {
        return R.ok(iScenicInfoService.updateById(scenicInfo));
    }

    /**
     * 删除景点
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    @ApiOperation(value = "删除景点", notes = "删除景点")
    public R deleteById(@PathVariable("ids") List<Integer> ids) {
        return R.ok(iScenicInfoService.removeByIds(ids));
    }
}
