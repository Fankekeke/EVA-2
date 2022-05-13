package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.service.CacheService;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.HotelInfo;
import cc.mrbird.febs.cos.service.IHotelInfoService;
import cc.mrbird.febs.system.domain.User;
import cc.mrbird.febs.system.service.UserService;
import cn.hutool.core.date.DateUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author FanK
 */
@RestController
@RequestMapping("/cos/hotel-info")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class HotelInfoController {

    private final IHotelInfoService hotelInfoService;

    private final UserService userService;

    private final CacheService cacheService;

    @SneakyThrows
    @GetMapping("/audit")
    public R audit(Integer status, Integer userId) {
        HotelInfo hotelInfo = hotelInfoService.getById(userId);
        User user = userService.getById(hotelInfo.getUserId());
        userService.update(Wrappers.<User>lambdaUpdate().set(User::getStatus, status).eq(User::getUserId, hotelInfo.getUserId()));
        // 重新将用户信息，加载到 redis中
        cacheService.saveUser(user.getUsername());
        return R.ok(true);
    }

    /**
     * 根据用户ID获取酒店信息
     * @param userId
     * @return
     */
    @GetMapping("/getHotelByUser")
    public R getHotelByUser(Integer userId) {
        return R.ok(hotelInfoService.getOne(Wrappers.<HotelInfo>lambdaQuery().eq(HotelInfo::getUserId, userId)));
    }

    /**
     *
     * @return
     */
    @GetMapping("/list")
    public R list() {
        return R.ok(hotelInfoService.list());
    }

    /**
     * 分页查询民宿信息
     * @param page
     * @param hotelInfo
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, HotelInfo hotelInfo) {
        return R.ok(hotelInfoService.hotelInfoByPage(page, hotelInfo));
    }

    /**
     * 添加酒店信息
     * @param hotelInfo
     * @return
     */
    @PostMapping
    public R save(HotelInfo hotelInfo) {
        hotelInfo.setCreateDate(DateUtil.formatDateTime(new Date()));
        return R.ok(hotelInfoService.save(hotelInfo));
    }

    /**
     * 修改酒店信息
     * @param hotelInfo
     * @return
     */
    @PutMapping
    public R edit(HotelInfo hotelInfo) {
        return R.ok(hotelInfoService.updateById(hotelInfo));
    }

    /**
     * 删除酒店信息
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(hotelInfoService.removeByIds(ids));
    }
}
