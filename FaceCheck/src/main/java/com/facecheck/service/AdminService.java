package com.facecheck.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.facecheck.entity.Admin;
import com.facecheck.entity.Employee;
import com.facecheck.entity.recode;
import com.facecheck.mapper.AdminMapper;
import com.facecheck.mapper.EmployeeMapper;
import com.facecheck.mapper.RecodeMapper;
import com.facecheck.mapper.RecordMapper;

@Service
public class AdminService {
	@Autowired
	private AdminMapper adminmapper;
	
	@Autowired
	private EmployeeMapper employee;
	
	@Autowired
	private RecodeMapper recode;
	
	@Autowired
    private RecordMapper recordMapper;
	
	public Map<String, Object> getDashboardData() {
	    // 최근 6일 날짜 생성
	    List<String> labels = new ArrayList<>();
	    LocalDate today = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");
	    
	    for (int i = 5; i >= 0; i--) {
	        labels.add(today.minusDays(i).format(formatter));
	    }

	    // 직원 출입 데이터 조회
	    Map<String, Integer> employeeCounts = new HashMap<>();
	    for (Map<String, Object> row : recordMapper.getEmployeeAccessCount(5)) {  // days 값 확인
	        String date = ((java.sql.Date) row.get("date")).toLocalDate().format(formatter);
	        employeeCounts.put(date, ((Long) row.get("count")).intValue());
	    }

	    // 게스트 출입 데이터 조회
	    Map<String, Integer> guestCounts = new HashMap<>();
	    for (Map<String, Object> row : recordMapper.getGuestAccessCount(5)) {  // days 값 확인
	        String date = ((java.sql.Date) row.get("date")).toLocalDate().format(formatter);
	        guestCounts.put(date, ((Long) row.get("count")).intValue());
	    }

	    // 누락된 날짜는 0으로 채움
	    List<Integer> employeeData = new ArrayList<>();
	    List<Integer> guestData = new ArrayList<>();
	    
	    for (String label : labels) {
	        employeeData.add(employeeCounts.getOrDefault(label, 0));
	        guestData.add(guestCounts.getOrDefault(label, 0));
	    }

	    // 응답 데이터 구성
	    Map<String, Object> response = new HashMap<>();
	    response.put("labels", labels);
	    response.put("datasets", Arrays.asList(
	        new HashMap<String, Object>() {{
	            put("label", "직원");
	            put("data", employeeData);
	            put("backgroundColor", "#4CAF50");
	            put("borderColor", "#4CAF50");
	            put("borderWidth", 1);
	        }},
	        new HashMap<String, Object>() {{
	            put("label", "게스트");
	            put("data", guestData);
	            put("backgroundColor", "#FF9800");
	            put("borderColor", "#FF9800");
	            put("borderWidth", 1);
	        }}
	    ));
	    
	    return response;
	}

	
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


	public int update(Employee emp) {
		int updatedRows = employee.update(emp);
        return updatedRows; 
	}


	public void insert(Employee emp) {
		
		employee.insert(emp);
		
	}

	
}