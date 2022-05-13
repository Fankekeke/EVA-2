package cc.mrbird.febs.cos.entity;

import java.time.LocalDateTime;
import java.io.Serializable;
import java.util.List;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 民宿管理
 *
 * @author FanK
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class HotelInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ID", type = IdType.AUTO)
    private Integer id;

    /**
     * 旅店名称
     */
    private String name;

    /**
     * 地址
     */
    private String address;

    /**
     * 图片
     */
    private String images;

    /**
     * 标签
     */
    private String tag;

    /**
     * 备注
     */
    private String content;

    /**
     * 经纬度
     */
    private String point;

    /**
     * 酒店政策
     */
    private String policy;

    /**
     * 入住方式
     */
    private String checkIn;

    /**
     * 创建时间
     */
    private String createDate;

    private Long userId;

    @TableField(exist = false)
    private List<RoomType> roomTypes;

}
