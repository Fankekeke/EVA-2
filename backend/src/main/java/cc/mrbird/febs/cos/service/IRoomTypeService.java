package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.RoomType;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface IRoomTypeService extends IService<RoomType> {

    /**
     * 分页查询房间类型
     * @param page
     * @param roomType
     * @return
     */
    IPage<LinkedHashMap<String, Object>> roomTypeByPage(Page page, RoomType roomType);

    /**
     * 查询当前房间余量
     * @param roomTypeId
     * @return
     */
    Integer roomNum(Integer roomTypeId);
}
