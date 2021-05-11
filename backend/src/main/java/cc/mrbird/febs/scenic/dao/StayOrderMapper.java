package cc.mrbird.febs.scenic.dao;

import cc.mrbird.febs.scenic.entity.StayOrder;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
public interface StayOrderMapper extends BaseMapper<StayOrder> {

    //分页查询
    IPage<List<Map>> getStayOrderInfoByPage(Page page, @Param("stayOrder") StayOrder stayOrder);

    //根据用户查询
    IPage<List<Map>> getStatOrderByUser(Page page, @Param("stayOrder") StayOrder stayOrder);
}
