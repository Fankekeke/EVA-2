package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.PostInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
public interface IPostInfoService extends IService<PostInfo> {

    /**
     * 分页查询帖子信息
     * @param page
     * @param postInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> getPostInfoByPage(Page page, PostInfo postInfo);

    /**
     * 根据贴子ID获取回复信息
     * @param postId
     * @return
     */
    List<LinkedHashMap<String, Object>> replyInfoByPostId(Integer postId);

    /**
     * 获取贴子信息
     * @return
     */
    List<LinkedHashMap<String, Object>> getPostList();

    /**
     * 根据贴子编号获取详细信息
     * @param postId
     * @return
     */
    LinkedHashMap<String, Object> getPostInfoById(Integer postId);

    /**
     * 获取热门贴子信息
     * @return
     */
    List<LinkedHashMap<String, Object>> getPostListHot();
}
