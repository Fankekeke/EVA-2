package cc.mrbird.febs.scenic.service;

import cc.mrbird.febs.scenic.entity.QuestionInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
public interface IQuestionInfoService extends IService<QuestionInfo> {

    //分页查询
    IPage<List<Map>> getAccountInfoByPage(Page page, QuestionInfo questionInfo);

}
