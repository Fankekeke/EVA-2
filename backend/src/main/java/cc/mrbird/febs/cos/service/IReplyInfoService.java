package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.ReplyInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
public interface IReplyInfoService extends IService<ReplyInfo> {

    /**
     * 分页查询回复信息
     * @param page
     * @param replyInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> replyInfoByPage(Page page, ReplyInfo replyInfo);
}
