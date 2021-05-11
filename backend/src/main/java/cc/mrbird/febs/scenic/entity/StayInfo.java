package cc.mrbird.febs.scenic.entity;

import java.math.BigDecimal;
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
public class StayInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type= IdType.AUTO)
    private Integer id;
    /**
     * 住宿编号
     */
    private String code;

    /**
     * 旅馆名称
     */
    private String stayName;

    /**
     * 价格
     */
    private BigDecimal stayPrice;

    /**
     * 旅馆地址
     */
    private String stayAddress;

    /**
     * 经纬度
     */
    private String point;

    /**
     * 外链图片
     */
    private String webImg;


}
