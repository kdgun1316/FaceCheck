package com.facecheck.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facecheck.entity.Admin;
import com.facecheck.mapper.AdminMapper;

@Service
public class AdminService {
	@Autowired
	private AdminMapper adminmapper;
	
	public Admin login(Admin admin) {
		Admin result = adminmapper.login(admin);
		return result; 
		
	}

}
