package cc.mrbird.febs.scenic.service.impl;

import cc.mrbird.febs.scenic.entity.QuestionInfo;
import cc.mrbird.febs.scenic.dao.QuestionInfoMapper;
import cc.mrbird.febs.scenic.service.IQuestionInfoService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
@Service
@AllArgsConstructor
public class QuestionInfoServiceImpl extends ServiceImpl<QuestionInfoMapper, QuestionInfo> implements IQuestionInfoService {

    private final QuestionInfoMapper questionInfoMapper;

    @Override
    public IPage<List<Map>> getAccountInfoByPage(Page page, QuestionInfo questionInfo) {
        return questionInfoMapper.getAccountInfoByPage(page,questionInfo);
    }
}
