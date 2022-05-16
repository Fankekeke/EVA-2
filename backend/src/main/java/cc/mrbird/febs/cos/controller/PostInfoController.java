package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.PostInfo;
import cc.mrbird.febs.cos.entity.UserInfo;
import cc.mrbird.febs.cos.service.IPostInfoService;
import cc.mrbird.febs.cos.service.IUserInfoService;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author FanK
 */
@RestController
@RequestMapping("/cos/post-info")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PostInfoController {

    private final IPostInfoService postInfoService;

    private final IUserInfoService userInfoService;

    /**
     * 根据贴子ID获取回复信息
     * @param postId
     * @return
     */
    @GetMapping("/reply")
    public R replyInfoByPostId(@RequestParam Integer postId) {
        return R.ok(postInfoService.replyInfoByPostId(postId));
    }

    /**
     * 分页查询帖子信息
     * @param page
     * @param postInfo
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, PostInfo postInfo) {
        if (postInfo.getUserId() != null) {
            UserInfo userInfo = userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, postInfo.getUserId()));
            postInfo.setUserId(userInfo.getId());
        }
        return R.ok(postInfoService.getPostInfoByPage(page, postInfo));
    }

    /**
     * 新增帖子信息
     * @param postInfo
     * @return
     */
    @PostMapping
    public R save(PostInfo postInfo) {
        UserInfo userInfo = userInfoService.getOne(Wrappers.<UserInfo>lambdaQuery().eq(UserInfo::getUserId, postInfo.getUserId()));
        postInfo.setUserId(userInfo.getId());
        postInfo.setCreateDate(DateUtil.formatDateTime(new Date()));
        return R.ok(postInfoService.save(postInfo));
    }

    /**
     * 修改帖子信息
     * @param postInfo
     * @return
     */
    @PutMapping
    public R edit(PostInfo postInfo) {
        return R.ok(postInfoService.updateById(postInfo));
    }

    /**
     * 删除帖子信息
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(postInfoService.removeByIds(ids));
    }
}
