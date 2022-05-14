package cc.mrbird.febs.cos.dao;

import cc.mrbird.febs.cos.entity.UserInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface UserInfoMapper extends BaseMapper<UserInfo> {

    /**
     * 分页查询用户信息
     * @param page
     * @param userInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> userInfoByPage(Page page, @Param("userInfo") UserInfo userInfo);
}
