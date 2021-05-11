package cc.mrbird.febs.scenic.service.impl;

import cc.mrbird.febs.scenic.entity.StayOrder;
import cc.mrbird.febs.scenic.dao.StayOrderMapper;
import cc.mrbird.febs.scenic.service.IStayOrderService;
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
public class StayOrderServiceImpl extends ServiceImpl<StayOrderMapper, StayOrder> implements IStayOrderService {

    private final StayOrderMapper stayOrderMapper;

    @Override
    public IPage<List<Map>> getStayOrderInfoByPage(Page page, StayOrder stayOrder) {
        return stayOrderMapper.getStayOrderInfoByPage(page,stayOrder);
    }

    @Override
    public IPage<List<Map>> getStatOrderByUser(Page page, StayOrder stayOrder) {
        return stayOrderMapper.getStatOrderByUser(page,stayOrder);
    }

}
