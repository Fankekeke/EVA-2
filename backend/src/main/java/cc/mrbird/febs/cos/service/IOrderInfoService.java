package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.OrderInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
public interface IOrderInfoService extends IService<OrderInfo> {

    /**
     * 分页查询订单信息
     * @param page
     * @param orderInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> orderInfoByPage(Page page, OrderInfo orderInfo);

    /**
     * 主页信息
     * @param type
     * @param userId
     * @return
     */
    LinkedHashMap<String, Object> home(Integer type, Integer userId);

    /**
     * 根据用户获取订单
     * @param userId
     * @return
     */
    List<LinkedHashMap<String, Object>> getOrderByUserId(Integer userId);
}
