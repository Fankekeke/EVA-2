package cc.mrbird.febs.scenic.service.impl;

import cc.mrbird.febs.scenic.entity.OrderInfo;
import cc.mrbird.febs.scenic.dao.OrderInfoMapper;
import cc.mrbird.febs.scenic.service.IOrderInfoService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
@Service
@AllArgsConstructor
public class OrderInfoServiceImpl extends ServiceImpl<OrderInfoMapper, OrderInfo> implements IOrderInfoService {

    private final OrderInfoMapper orderInfoMapper;

    @Override
    public IPage<List<Map>> getOrderInfoByPage(Page page, OrderInfo orderInfo) {
        return orderInfoMapper.getOrderInfoByPage(page,orderInfo);
    }

    @Override
    public IPage<List<Map>> getOrderByUser(Page page, OrderInfo orderInfo) {
        return orderInfoMapper.getOrderByUser(page,orderInfo);
    }

}
