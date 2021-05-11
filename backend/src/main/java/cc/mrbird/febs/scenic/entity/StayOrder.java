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
public class StayOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type= IdType.AUTO)
    private Integer id;
    /**
     * 住宿订单编号
     */
    private String code;

    /**
     * 所属旅馆
     */
    private String stayCode;

    /**
     * 住宿房间数
     */
    private Integer stayNum;

    /**
     * 住宿天数
     */
    private Integer stayDay;

    /**
     * 预定时间
     */
    private String stayDate;

    /**
     * 住宿状态
     */
    private Integer stayStatus;

    /**
     * 所属用户
     */
    private String userCode;


}
