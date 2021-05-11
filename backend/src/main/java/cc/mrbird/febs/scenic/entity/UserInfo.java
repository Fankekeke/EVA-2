package cc.mrbird.febs.scenic.entity;

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
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(type= IdType.AUTO)
    private Integer id;
    /**
     * 用户编号
     */
    private String code;

    /**
     * 用户名称
     */
    private String name;

    /**
     * 密码
     */
    private String pwd;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 住址
     */
    private String address;

    /**
     * 性别 1/男 0女
     */
    private Integer sex;

    private String uppwer;

    private String ipAddress;

    private String windows;

    private String phone;

    private Integer age;

    private String idcard;

    private String born;


}
