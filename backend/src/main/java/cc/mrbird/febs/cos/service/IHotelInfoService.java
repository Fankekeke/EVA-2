package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.HotelInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface IHotelInfoService extends IService<HotelInfo> {

    /**
     * 分页查询民宿信息
     * @param page
     * @param hotelInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> hotelInfoByPage(Page page, HotelInfo hotelInfo);
}
