package com.facecheck.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.mapper.AdminMapper;
import com.facecheck.mapper.EmployeeMapper;

@Service
public class AdminService {
	@Autowired
	private AdminMapper adminmapper;
	
	
	@Autowired
	private EmployeeMapper employee;
	
	public Admin login(Admin admin) {
		Admin result = adminmapper.login(admin);
		return result; 
		
	}


	public List<Employee> empselect() {

		return employee.empselect();
	}

}
