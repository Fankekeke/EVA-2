package cc.mrbird.febs.scenic.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class IdCard {
    // 身份证号码
    private String idCard;

    // 出生日期
    private String born;

    // 性别
    private String sex;

    // 所在地区
    private String att;
}
