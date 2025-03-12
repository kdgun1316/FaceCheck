package com.facecheck.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.model.Admin;

@Mapper
public interface AdminMapper {
    
    // 관리자 로그인
   @Select("SELECT * FROM admin WHERE id=#{id} AND password=#{password}")
    public Admin login(Admin admin);
}
