package cc.mrbird.febs.scenic.entity;

import java.math.BigDecimal;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
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
@TableName("scenic_info")
public class ScenicInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type= IdType.AUTO)
    private Integer id;
    /**
     * 景点编号
     */
    private String code;

    /**
     * 景点名称
     */
    private String scenicName;

    /**
     * 票价
     */
    private BigDecimal scenicPrice;

    /**
     * 所在地
     */
    private String address;

    /**
     * 经纬度
     */
    private String point;

    /**
     * 历史文化
     */
    private String history;

    /**
     * 外链图片
     */
    private String webImg;

    private String area;

    private String hot;

    private String link;

    private String level;

    private String sold;


}
