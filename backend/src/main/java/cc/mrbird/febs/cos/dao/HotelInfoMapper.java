package cc.mrbird.febs.cos.dao;

import cc.mrbird.febs.cos.entity.HotelInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface HotelInfoMapper extends BaseMapper<HotelInfo> {

    /**
     * 分页查询民宿信息
     * @param page
     * @param hotelInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> hotelInfoByPage(Page page, @Param("hotelInfo") HotelInfo hotelInfo);
}
