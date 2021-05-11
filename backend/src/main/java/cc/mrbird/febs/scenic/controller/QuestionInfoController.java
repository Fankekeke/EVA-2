package cc.mrbird.febs.scenic.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.scenic.entity.QuestionInfo;
import cc.mrbird.febs.scenic.service.IQuestionInfoService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @author saber
 */
@RestController
@RequestMapping("/scenic/question-info")
@AllArgsConstructor
public class QuestionInfoController {


    private final IQuestionInfoService iQuestionInfoService;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 分页查询
     * @param page
     * @param questionInfo
     * @return
     */
    @GetMapping("/page")
    @ApiOperation(value = "分页查询", notes = "分页查询")
    public R getQuestionByPage(Page page, QuestionInfo questionInfo) {
        return R.ok(iQuestionInfoService.getAccountInfoByPage(page,questionInfo));
//        return R.ok(iQuestionInfoService.page(page, Wrappers.<QuestionInfo>lambdaQuery()
//                .eq(questionInfo.getQuestUser()!=null,QuestionInfo::getQuestUser,questionInfo.getQuestUser())
//                .like(questionInfo.getQuestTitle()!=null,QuestionInfo::getQuestTitle,questionInfo.getQuestTitle())));
    }

    /**
     * 查询所有贴子
     * @param questionInfo
     * @return
     */
    @GetMapping("/info/list")
    @ApiOperation(value = "查询所有贴子", notes = "查询所有贴子")
    public R getQuestionByList(QuestionInfo questionInfo) {
        return R.ok(iQuestionInfoService.list(Wrappers.<QuestionInfo>lambdaQuery()
                .eq(questionInfo.getQuestUser()!=null,QuestionInfo::getQuestUser,questionInfo.getQuestUser())
                .like(questionInfo.getQuestTitle()!=null,QuestionInfo::getQuestTitle,questionInfo.getQuestTitle())));
    }

    /**
     * 新增贴子
     * @param questionInfo
     * @return
     */
    @PostMapping
    @ApiOperation(value = "新增贴子", notes = "新增贴子")
    public R save(QuestionInfo questionInfo) {
        questionInfo.setQuestDate(dateFormat.format(new Date()));
        if(questionInfo.getQuestUser() == null) {
            questionInfo.setQuestUser("96c38c51-f174-4059-959a-98ff6a2d9b73");
        }
        questionInfo.setCode(UUID.randomUUID().toString());
        return R.ok(iQuestionInfoService.save(questionInfo));
    }

    /**
     * 修改贴子
     * @param questionInfo
     * @return
     */
    @PutMapping
    @ApiOperation(value = "修改贴子", notes = "修改贴子")
    public R updateById(QuestionInfo questionInfo) {
        return R.ok(iQuestionInfoService.updateById(questionInfo));
    }

    /**
     * 删除贴子
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    @ApiOperation(value = "删除贴子", notes = "删除贴子")
    public R deleteById(@PathVariable("ids") List<Integer> ids) {
        return R.ok(iQuestionInfoService.removeByIds(ids));
    }
}
