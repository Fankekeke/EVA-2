package cc.mrbird.febs.cos.service.impl;

import cc.mrbird.febs.cos.entity.RoomType;
import cc.mrbird.febs.cos.dao.RoomTypeMapper;
import cc.mrbird.febs.cos.service.IRoomTypeService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
@Service
public class RoomTypeServiceImpl extends ServiceImpl<RoomTypeMapper, RoomType> implements IRoomTypeService {

    @Override
    public IPage<LinkedHashMap<String, Object>> roomTypeByPage(Page page, RoomType roomType) {
        return baseMapper.roomTypeByPage(page, roomType);
    }

    @Override
    public Integer roomNum(Integer roomTypeId) {
        return baseMapper.roomNum(roomTypeId);
    }
}
