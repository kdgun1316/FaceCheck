package com.facecheck.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Admin;

@Mapper
public interface AdminMapper {
	@Select("select * from admin_info where admin_id=#{admin_id} and admin_pw=#{admin_pw}")
	public Admin login(Admin admin);
}
