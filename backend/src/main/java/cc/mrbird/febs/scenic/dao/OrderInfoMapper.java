package cc.mrbird.febs.scenic.dao;

import cc.mrbird.febs.scenic.entity.OrderInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
public interface OrderInfoMapper extends BaseMapper<OrderInfo> {

    //分页查询
    IPage<List<Map>> getOrderInfoByPage(Page page, @Param("orderInfo") OrderInfo orderInfo);

    //根据用户查询
    IPage<List<Map>> getOrderByUser(Page page,@Param("orderInfo") OrderInfo orderInfo);

}
