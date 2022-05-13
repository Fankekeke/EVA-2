package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.ScenicInfo;
import cc.mrbird.febs.cos.service.IScenicInfoService;
import cn.hutool.core.util.StrUtil;
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
@RequestMapping("/cos/scenic-info")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ScenicInfoController {

    private final IScenicInfoService scenicInfoService;

    /**
     * 分页查询景点信息
     * @param page
     * @param scenicInfo
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, ScenicInfo scenicInfo) {
        return R.ok(scenicInfoService.page(page, Wrappers.<ScenicInfo>lambdaQuery()
                .like(!StrUtil.isBlank(scenicInfo.getScenicName()), ScenicInfo::getScenicName, scenicInfo.getScenicName())
                .like(!StrUtil.isBlank(scenicInfo.getAddress()), ScenicInfo::getAddress, scenicInfo.getAddress())));
    }

    /**
     * 添加景点信息
     * @param scenicInfo
     * @return
     */
    @PostMapping
    public R save(ScenicInfo scenicInfo) {
        return R.ok(scenicInfoService.save(scenicInfo));
    }

    /**
     * 修改景点信息
     * @param scenicInfo
     * @return
     */
    @PutMapping
    public R edit(ScenicInfo scenicInfo) {
        return R.ok(scenicInfoService.updateById(scenicInfo));
    }

    /**
     * 删除景点信息
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(scenicInfoService.removeByIds(ids));
    }
}
