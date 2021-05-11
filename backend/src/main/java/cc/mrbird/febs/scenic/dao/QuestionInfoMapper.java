package cc.mrbird.febs.scenic.dao;

import cc.mrbird.febs.scenic.entity.QuestionInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author saber
 */
public interface QuestionInfoMapper extends BaseMapper<QuestionInfo> {

    //分页查询
    IPage<List<Map>> getAccountInfoByPage(Page page, @Param("questionInfo") QuestionInfo questionInfo);

}
