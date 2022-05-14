package cc.mrbird.febs.cos.service.impl;

import cc.mrbird.febs.cos.entity.ScenicOrder;
import cc.mrbird.febs.cos.dao.ScenicOrderMapper;
import cc.mrbird.febs.cos.service.IScenicOrderService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
@Service
public class ScenicOrderServiceImpl extends ServiceImpl<ScenicOrderMapper, ScenicOrder> implements IScenicOrderService {

    @Override
    public IPage<LinkedHashMap<String, Object>> scenicInfoByPage(Page page, ScenicOrder scenicOrder) {
        return baseMapper.scenicInfoByPage(page, scenicOrder);
    }
}
