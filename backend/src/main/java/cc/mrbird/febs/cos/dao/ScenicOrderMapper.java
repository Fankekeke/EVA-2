package cc.mrbird.febs.cos.dao;

import cc.mrbird.febs.cos.entity.ScenicOrder;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface ScenicOrderMapper extends BaseMapper<ScenicOrder> {

    /**
     * 分页查询景点订单
     * @param page
     * @param scenicOrder
     * @return
     */
    IPage<LinkedHashMap<String, Object>> scenicInfoByPage(Page page, @Param("scenicOrder") ScenicOrder scenicOrder);
}
