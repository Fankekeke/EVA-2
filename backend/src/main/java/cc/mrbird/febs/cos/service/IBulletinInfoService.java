package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.BulletinInfo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.LinkedHashMap;

/**
 * @author FanK
 */
public interface IBulletinInfoService extends IService<BulletinInfo> {

    /**
     * 分页获取公告信息
     * @param page
     * @param bulletinInfo
     * @return
     */
    IPage<LinkedHashMap<String, Object>> getBulletinByPage(Page page, BulletinInfo bulletinInfo);
}
