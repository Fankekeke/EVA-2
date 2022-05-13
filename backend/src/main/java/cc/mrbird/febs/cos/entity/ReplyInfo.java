package cc.mrbird.febs.cos.entity;

import java.time.LocalDateTime;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 回复信息管理
 *
 * @author FanK
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ReplyInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ID", type = IdType.AUTO)
    private Integer id;

    /**
     * 贴子ID
     */
    private Integer postId;

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 回复内容
     */
    private String content;

    /**
     * 发送时间
     */
    private String createDate;

    @TableField(exist = false)
    private String userName;

    @TableField(exist = false)
    private String title;
}
