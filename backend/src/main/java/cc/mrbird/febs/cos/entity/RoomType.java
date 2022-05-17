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
 * 房间类型
 *
 * @author FanK
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class RoomType implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ID", type = IdType.AUTO)
    private Integer id;

    /**
     * 房间类型名称
     */
    private String name;

    /**
     * 房间价格
     */
    private BigDecimal price;

    /**
     * 图片
     */
    private String images;

    /**
     * 面积
     */
    private BigDecimal area;

    /**
     * 房间数量
     */
    private Integer roomNum;

    /**
     * 旅店ID
     */
    private Integer hotelId;

    /**
     * 备注
     */
    private String content;

    /**
     * 创建时间
     */
    private String createDate;

    @TableField(exist = false)
    private String hotelName;

    @TableField(exist = false)
    private Integer userId;

    @TableField(exist = false)
    private Integer num;

    @TableField(exist = false)
    private String address;
}
