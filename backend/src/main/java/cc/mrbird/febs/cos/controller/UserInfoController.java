package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.service.CacheService;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.UserInfo;
import cc.mrbird.febs.cos.service.IUserInfoService;
import cc.mrbird.febs.system.domain.User;
import cc.mrbird.febs.system.service.UserService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author FanK
 */
@RestController
@RequestMapping("/cos/user-info")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserInfoController {

    private final IUserInfoService userInfoService;

    private final UserService userService;

    private final CacheService cacheService;

    /**
     * 分页查询用户信息
     * @param page
     * @param userInfo
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, UserInfo userInfo) {
        return R.ok(userInfoService.userInfoByPage(page, userInfo));
    }

    /**
     * 用户状态修改
     * @param userId
     * @param flag
     * @return
     */
    @GetMapping("/audit")
    @SneakyThrows
    public R audit(String userId, Integer flag) {
        UserInfo userInfo = userInfoService.getById(userId);
        userService.update(Wrappers.<User>lambdaUpdate().set(User::getStatus, flag).eq(User::getUserId, userInfo.getUserId()));
        User user = userService.getById(userInfo.getUserId());
        // 重新将用户信息，加载到 redis中
        cacheService.saveUser(user.getUsername());
        return R.ok(true);
    }
}
