package cc.mrbird.febs.scenic.service;

import cc.mrbird.febs.scenic.entity.UserInfo;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author saber
 */
public interface IUserInfoService extends IService<UserInfo> {

    UserInfo login(String email,String pwd);

}
