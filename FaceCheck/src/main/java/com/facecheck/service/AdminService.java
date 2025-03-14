package com.facecheck.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;
import com.facecheck.mapper.AdminMapper;
import com.facecheck.mapper.EmployeeMapper;
import com.facecheck.mapper.RecodeMapper;

@Service
public class AdminService {
	@Autowired
	private AdminMapper adminmapper;
	
	@Autowired
	private EmployeeMapper employee;
	
	@Autowired
	private RecodeMapper recode;
	
	public Admin login(Admin admin) {
		Admin result = adminmapper.login(admin);
		return result; 
		
	}

    public List<Employee> empselect() {
        return employee.empselect();
    }


	public List<recode> recselect() {
		return recode.recselect();
	}


	public void delete(String emp_num) {
        System.out.println("🛠 Mapper에서 삭제 실행: " + emp_num);
        employee.delete(emp_num);  
	}
	
	
    // 새로 추가: emp_num의 개수를 카운트하는 메서드
    public int getEmpNumCount() {
        return employee.countEmpNum();
    }
}