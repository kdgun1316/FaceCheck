package com.facecheck.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Admin;

@Mapper
public interface AdminMapper {
	
		
	
	@Select("SELECT * FROM admin_info WHERE admin_id = #{admin_id} AND admin_pw = SHA2(#{admin_pw}, 512)")
	public Admin login(Admin admin);

}
