package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.PostInfo;
import cc.mrbird.febs.cos.entity.ReplyInfo;
import cc.mrbird.febs.cos.service.IPostInfoService;
import cc.mrbird.febs.cos.service.IReplyInfoService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author FanK
 */
@RestController
@RequestMapping("/cos/reply-info")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ReplyInfoController {

    private final IReplyInfoService replyInfoService;

    /**
     * 分页查询回复信息
     * @param page
     * @param replyInfo
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, ReplyInfo replyInfo) {
        return R.ok(replyInfoService.replyInfoByPage(page, replyInfo));
    }

    /**
     * 删除回复信息
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(replyInfoService.removeByIds(ids));
    }
}
