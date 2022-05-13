package cc.mrbird.febs.cos.service.impl;

import cc.mrbird.febs.cos.entity.PostInfo;
import cc.mrbird.febs.cos.dao.PostInfoMapper;
import cc.mrbird.febs.cos.service.IPostInfoService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
@Service
public class PostInfoServiceImpl extends ServiceImpl<PostInfoMapper, PostInfo> implements IPostInfoService {

    @Override
    public IPage<LinkedHashMap<String, Object>> getPostInfoByPage(Page page, PostInfo postInfo) {
        return baseMapper.getPostInfoByPage(page, postInfo);
    }

    @Override
    public List<LinkedHashMap<String, Object>> replyInfoByPostId(Integer postId) {
        return baseMapper.replyInfoByPostId(postId);
    }

    @Override
    public List<LinkedHashMap<String, Object>> getPostList() {
        return baseMapper.getPostList();
    }

    @Override
    public LinkedHashMap<String, Object> getPostInfoById(Integer postId) {
        LinkedHashMap<String, Object> result = new LinkedHashMap<>();
        result.put("postInfo", baseMapper.getPostInfoById(postId));
        result.put("replyInfo", baseMapper.replyInfoByPostId(postId));
        return result;
    }

    @Override
    public List<LinkedHashMap<String, Object>> getPostListHot() {
        return baseMapper.getPostListHot();
    }
}
