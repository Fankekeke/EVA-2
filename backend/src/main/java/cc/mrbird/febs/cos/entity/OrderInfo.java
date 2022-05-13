package cc.mrbird.febs.cos.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 订单信息
 *
 * @author FanK
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class OrderInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ID", type = IdType.AUTO)
    private Integer id;

    /**
     * 订单编号
     */
    private String code;

    /**
     * 房间类型
     */
    private Integer typeId;

    /**
     * 民宿ID
     */
    private Integer hotelId;

    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 入住天数
     */
    private Integer dayNum;

    /**
     * 起始时间
     */
    private String startDate;

    /**
     * 结束时间
     */
    private String endDate;

    /**
     * 状态 0.未入住 1.已入住
     */
    private Integer orderStatus;

    /**
     * 下单时间
     */
    private String createDate;

    @TableField(exist = false)
    private String userName;

    @TableField(exist = false)
    private String hotelName;

    @TableField(exist = false)
    private String roomName;
}
