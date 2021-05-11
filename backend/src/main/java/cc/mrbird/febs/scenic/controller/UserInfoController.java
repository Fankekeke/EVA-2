package cc.mrbird.febs.scenic.controller;


import cc.mrbird.febs.common.utils.MD5Util;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.scenic.entity.UserInfo;
import cc.mrbird.febs.scenic.service.IUserInfoService;
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
@RequestMapping("/scenic/user-info")
@AllArgsConstructor
public class UserInfoController {

    private final IUserInfoService iUserInfoService;

    /**
     * 分页查询
     * @param page
     * @param userInfo
     * @return
     */
    @GetMapping("/page")
    @ApiOperation(value = "分页查询", notes = "分页查询")
    public R getUserByPage(Page page, UserInfo userInfo) {
        return R.ok(iUserInfoService.page(page, Wrappers.<UserInfo>lambdaQuery()
                .like(userInfo.getName()!=null,UserInfo::getName,userInfo.getName())
                .like(userInfo.getEmail()!=null,UserInfo::getEmail,userInfo.getEmail())
                .eq(userInfo.getSex()!=null,UserInfo::getSex,userInfo.getSex())));
    }

    /**
     * 查询所有用户
     * @param userInfo
     * @return
     */
    @GetMapping("/info/list")
    @ApiOperation(value = "查询所有用户", notes = "查询所有用户")
    public R getUserByList(UserInfo userInfo) {
        return R.ok(iUserInfoService.list(Wrappers.<UserInfo>lambdaQuery()
                .like(userInfo.getName()!=null,UserInfo::getName,userInfo.getName())
                .like(userInfo.getEmail()!=null,UserInfo::getEmail,userInfo.getEmail())
                .eq(userInfo.getSex()!=null,UserInfo::getSex,userInfo.getSex())));
    }

    /**
     * 新增用户
     * @param userInfo
     * @return
     */
    @PostMapping
    @ApiOperation(value = "新增用户", notes = "新增用户")
    public R save(UserInfo userInfo) {
        userInfo.setCode(UUID.randomUUID().toString());
        userInfo.setPwd(MD5Util.encrypt("123456"));
        return R.ok(iUserInfoService.save(userInfo));
    }

    /**
     * 修改用户
     * @param userInfo
     * @return
     */
    @PutMapping
    @ApiOperation(value = "修改用户", notes = "修改用户")
    public R updateById(UserInfo userInfo) {
        System.out.println("===="+userInfo);
        return R.ok(iUserInfoService.updateById(userInfo));
    }

    /**
     * 删除用户
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    @ApiOperation(value = "删除用户", notes = "删除用户")
    public R deleteById(@PathVariable("ids") List<Integer> ids) {
        return R.ok(iUserInfoService.removeByIds(ids));
    }

}
