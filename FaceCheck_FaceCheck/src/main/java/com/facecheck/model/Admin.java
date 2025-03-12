package com.facecheck.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    private String id;       // 관리자 아이디
    private String password; // 관리자 비밀번호
}


