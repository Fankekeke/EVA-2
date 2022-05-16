package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.service.CacheService;
import cc.mrbird.febs.common.service.RedisService;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.UserInfo;
import cc.mrbird.febs.cos.service.IMailService;
import cc.mrbird.febs.cos.service.IUserInfoService;
import cc.mrbird.febs.system.domain.User;
import cc.mrbird.febs.system.service.UserService;
import cn.hutool.core.date.DateUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
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

    private final TemplateEngine templateEngine;

    private final IMailService iMailService;

    private final RedisService redisService;

    /**
     * 验证码验证
     * @param validateCode
     * @return
     */
    @SneakyThrows
    @GetMapping("/verification/check")
    public R verificationCheck(String validateCode, String email) {
        //1:获取redis里面的验证码信息
        String code = redisService.get(email);
        //2:判断验证码是否正确
        if (!StringUtils.isEmpty(validateCode)) {
            validateCode = validateCode.toLowerCase();
            code = code.toLowerCase();
            if (validateCode.equals(code)) {
                // 删除key
                redisService.del(email);
                return R.ok(true);
            }
        }
        return R.ok(false);
    }

    /**
     * 发送注册邮件
     * @param email
     * @return
     */
    @SneakyThrows
    @GetMapping("/register/email")
    public R sendRegisterEmail(String email) {
        // 判断邮箱是否重复
        Integer count = userInfoService.count(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getEmail, email));
        if (count > 0) {
            return R.ok(false);
        }
        // 绘制随机字符
        String randomString = "";
        for (int i = 1; i <= 50; i++) {
            randomString = String.valueOf((int) ((Math.random() * 9 + 1) * 100000));
        }

        Context context = new Context();
        context.setVariable("today", DateUtil.formatDate(new Date()));
        context.setVariable("verifyCode", randomString);
        String emailContent = templateEngine.process("registerEmail", context);
        iMailService.sendHtmlMail(email, "一体式旅游-账户验证", emailContent);
        // 将随机生成的验证码放入Redis中
        redisService.set(email, randomString);
        return R.ok(true);
    }

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
     * 根据ID获取用户信息
     * @param userId
     * @return
     */
    @GetMapping("/{userId}")
    public R getUserInfoDetail(@PathVariable("userId") Integer userId) {
        return R.ok(userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, userId)));
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

    /**
     * 修改用户信息
     * @param userInfo
     * @return
     */
    @PutMapping
    public R edit(UserInfo userInfo) {
        return R.ok(userInfoService.updateById(userInfo));
    }
}
