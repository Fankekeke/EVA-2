package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.ScenicOrder;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface IScenicOrderService extends IService<ScenicOrder> {

    /**
     * 分页查询景点订单
     * @param page
     * @param scenicOrder
     * @return
     */
    IPage<LinkedHashMap<String, Object>> scenicInfoByPage(Page page, ScenicOrder scenicOrder);
}
