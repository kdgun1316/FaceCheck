package com.facecheck.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;

@Mapper
public interface RecodeMapper {

	@Select("SELECT * FROM log_info")
	List<recode> recselect();
}
