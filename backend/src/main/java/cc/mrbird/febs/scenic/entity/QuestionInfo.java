package cc.mrbird.febs.scenic.entity;

import java.time.LocalDateTime;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 
 *
 * @author saber
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class QuestionInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type= IdType.AUTO)
    private Integer id;
    /**
     * 贴子编号
     */
    private String code;

    /**
     * 贴子标题
     */
    private String questTitle;

    /**
     * 发帖时间
     */
    private String questDate;

    /**
     * 发帖人
     */
    private String questUser;


}
