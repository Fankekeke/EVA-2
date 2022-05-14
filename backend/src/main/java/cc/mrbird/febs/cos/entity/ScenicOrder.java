package cc.mrbird.febs.cos.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 景区订单信息
 *
 * @author FanK
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ScenicOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ID", type = IdType.AUTO)
    private Integer id;

    /**
     * 订单编号
     */
    private String code;

    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 景区ID
     */
    private Integer scenicId;

    /**
     * 所属用户
     */
    private Integer userId;

    /**
     * 订单状态 1.未使用 2.已销票
     */
    private Integer orderStatus;

    /**
     * 购买时间
     */
    private String createDate;

    /**
     * 销票时间
     */
    private String updateDate;

    @TableField(exist = false)
    private String userName;

    @TableField(exist = false)
    private String scenicName;
}
