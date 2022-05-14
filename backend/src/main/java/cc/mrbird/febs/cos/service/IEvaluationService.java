package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.Evaluation;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author Fank
 */
public interface IEvaluationService extends IService<Evaluation> {

    /**
     * 分页查询评价信息
     * @param page
     * @param evaluation
     * @return
     */
    IPage<LinkedHashMap<String, Object>> evaluationByPage(Page page, Evaluation evaluation);

    /**
     * 获取房间评价
     * @param roomTypeId
     * @return
     */
    List<LinkedHashMap<String, Object>> getEvaluationByRoomType(Integer roomTypeId);
}
