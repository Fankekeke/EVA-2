package cc.mrbird.febs.scenic.service.impl;

import cc.mrbird.febs.scenic.entity.UserInfo;
import cc.mrbird.febs.scenic.dao.UserInfoMapper;
import cc.mrbird.febs.scenic.service.IUserInfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author saber
 */
@Service
@AllArgsConstructor
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements IUserInfoService {

    private final UserInfoMapper userInfoMapper;

    @Override
    public UserInfo login(String email, String pwd) {
        return null;
    }
}
