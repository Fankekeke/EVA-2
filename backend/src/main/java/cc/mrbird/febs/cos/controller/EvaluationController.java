package cc.mrbird.febs.cos.controller;


import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.cos.entity.Evaluation;
import cc.mrbird.febs.cos.service.IEvaluationService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Fank
 */
@RestController
@RequestMapping("/cos/evaluation")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class EvaluationController {

    private final IEvaluationService evaluationService;

    /**
     * 分页查询评价信息
     * @param page
     * @param evaluation
     * @return
     */
    @GetMapping("/page")
    public R page(Page page, Evaluation evaluation) {
        return R.ok(evaluationService.evaluationByPage(page, evaluation));
    }

    /**
     * 删除评价信息
     * @param ids
     * @return
     */
    @DeleteMapping("/{ids}")
    public R deleteByIds(@PathVariable("ids") List<Integer> ids) {
        return R.ok(evaluationService.removeByIds(ids));
    }

}
