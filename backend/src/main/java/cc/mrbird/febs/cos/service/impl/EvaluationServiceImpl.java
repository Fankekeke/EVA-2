package cc.mrbird.febs.cos.service.impl;

import cc.mrbird.febs.cos.dao.EvaluationMapper;
import cc.mrbird.febs.cos.entity.Evaluation;
import cc.mrbird.febs.cos.service.IEvaluationService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author Fank
 */
@Service
public class EvaluationServiceImpl extends ServiceImpl<EvaluationMapper, Evaluation> implements IEvaluationService {

    @Override
    public IPage<LinkedHashMap<String, Object>> evaluationByPage(Page page, Evaluation evaluation) {
        return baseMapper.evaluationByPage(page, evaluation);
    }

    @Override
    public List<LinkedHashMap<String, Object>> getEvaluationByRoomType(Integer roomTypeId) {
        return baseMapper.getEvaluationByRoomType(roomTypeId);
    }
}
