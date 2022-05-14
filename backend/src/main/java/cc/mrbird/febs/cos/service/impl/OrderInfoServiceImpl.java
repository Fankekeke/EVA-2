package cc.mrbird.febs.cos.service.impl;

import cc.mrbird.febs.cos.entity.HotelInfo;
import cc.mrbird.febs.cos.entity.OrderInfo;
import cc.mrbird.febs.cos.dao.OrderInfoMapper;
import cc.mrbird.febs.cos.entity.ScenicInfo;
import cc.mrbird.febs.cos.service.IHotelInfoService;
import cc.mrbird.febs.cos.service.IOrderInfoService;
import cc.mrbird.febs.cos.service.IScenicInfoService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class OrderInfoServiceImpl extends ServiceImpl<OrderInfoMapper, OrderInfo> implements IOrderInfoService {

    private final IHotelInfoService hotelInfoService;

    private final IScenicInfoService scenicInfoService;

    @Override
    public IPage<LinkedHashMap<String, Object>> orderInfoByPage(Page page, OrderInfo orderInfo) {
        return baseMapper.orderInfoByPage(page, orderInfo);
    }

    @Override
    public LinkedHashMap<String, Object> home(Integer type, Integer userId) {
        LinkedHashMap<String, Object> result = new LinkedHashMap<>();
        if (type == 75) {
            HotelInfo hotelInfo = hotelInfoService.getOne(Wrappers.<HotelInfo>lambdaQuery().eq(HotelInfo::getUserId, userId));
            result.put("orderInfoByHotel", baseMapper.orderInfoByHotelId(hotelInfo.getId()));
            result.put("orderNum", baseMapper.orderNumByHotelId(hotelInfo.getId()));
            result.put("orderTypeByHotelId", baseMapper.orderTypeByHotelId(hotelInfo.getId()));
        } else {
            result.put("scenic", scenicInfoService.list(Wrappers.<ScenicInfo>lambdaQuery().last("LIMIT 100")));
            result.put("hotel", hotelInfoService.list());
        }
        return result;
    }

    @Override
    public List<LinkedHashMap<String, Object>> getOrderByUserId(Integer userId) {
        return baseMapper.getOrderByUserId(userId);
    }
}
