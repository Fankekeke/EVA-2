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
public class OrderInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type= IdType.AUTO)
    private Integer id;
    /**
     * 订单编号
     */
    private String code;

    /**
     * 所属用户
     */
    private String userCode;

    /**
     * 票数
     */
    private Integer orderNum;

    /**
     * 所属景区
     */
    private String scenicCode;

    /**
     * 下单时间
     */
    private String orderDate;

    /**
     * 是否已使用
     */
    private Integer isUse;


}
