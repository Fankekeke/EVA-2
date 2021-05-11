package cc.mrbird.febs.scenic.service;

import cc.mrbird.febs.scenic.entity.StayOrder;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
public interface IStayOrderService extends IService<StayOrder> {

    //分页查询
    IPage<List<Map>> getStayOrderInfoByPage(Page page, StayOrder stayOrder);

    //根据用户查询
    IPage<List<Map>> getStatOrderByUser(Page page, StayOrder stayOrder);
}
