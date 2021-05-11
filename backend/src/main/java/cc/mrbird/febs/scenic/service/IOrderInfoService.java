package cc.mrbird.febs.scenic.service;

import cc.mrbird.febs.scenic.entity.OrderInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
public interface IOrderInfoService extends IService<OrderInfo> {

    //分页查询
    IPage<List<Map>> getOrderInfoByPage(Page page, OrderInfo orderInfo);

    //根据用户查询
    IPage<List<Map>> getOrderByUser(Page page,OrderInfo orderInfo);
}
