package com.facecheck.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facecheck.mapper.AdminMapper;
import com.facecheck.model.Admin;

@Service
public class AdminServiceImpl{

    @Autowired
    private AdminMapper adminMapper;

	public Admin login(Admin admin) {
		return adminMapper.login(admin);
	}
    
   
}
