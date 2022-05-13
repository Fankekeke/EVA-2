package cc.mrbird.febs.cos.service.impl;

import cc.mrbird.febs.cos.entity.HotelInfo;
import cc.mrbird.febs.cos.dao.HotelInfoMapper;
import cc.mrbird.febs.cos.service.IHotelInfoService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
@Service
public class HotelInfoServiceImpl extends ServiceImpl<HotelInfoMapper, HotelInfo> implements IHotelInfoService {

    @Override
    public IPage<LinkedHashMap<String, Object>> hotelInfoByPage(Page page, HotelInfo hotelInfo) {
        return baseMapper.hotelInfoByPage(page, hotelInfo);
    }
}
