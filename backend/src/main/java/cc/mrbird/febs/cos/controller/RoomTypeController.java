package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.HotelInfo;
import cc.mrbird.febs.cos.entity.RoomType;
import cc.mrbird.febs.cos.service.IHotelInfoService;
import cc.mrbird.febs.cos.service.IRoomTypeService;
import cn.hutool.core.date.DateUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author FanK
 */
@RestController
@RequestMapping("/cos/room-type")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RoomTypeController {

    private final IRoomTypeService roomTypeService;

    private final IHotelInfoService hotelInfoService;

    /**
     * 分页查询房间类型
     * @param page
     * @param roomType
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, RoomType roomType) {
        return R.ok(roomTypeService.roomTypeByPage(page, roomType));
    }

    /**
     * 添加房间类型
     * @param roomType
     * @return
     */
    @PostMapping
    public R save(RoomType roomType) {
        HotelInfo hotelInfo = hotelInfoService.getOne(Wrappers.<HotelInfo>lambdaQuery().eq(HotelInfo::getUserId, roomType.getUserId()));
        roomType.setHotelId(hotelInfo.getId());
        roomType.setCreateDate(DateUtil.formatDateTime(new Date()));
        return R.ok(roomTypeService.save(roomType));
    }

    /**
     * 查询当前房间余量
     * @param roomId
     * @return
     */
    @GetMapping("/{roomId}")
    public R roomNum(@PathVariable("roomId") Integer roomId) {
        return R.ok(roomTypeService.roomNum(roomId));
    }

    /**
     * 修改房间类型
     * @param roomType
     * @return
     */
    @PutMapping
    public R edit(RoomType roomType) {
        return R.ok(roomTypeService.updateById(roomType));
    }

    /**
     * 删除房间类型
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(roomTypeService.removeByIds(ids));
    }
}
