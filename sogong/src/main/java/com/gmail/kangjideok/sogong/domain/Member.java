package com.gmail.kangjideok.sogong.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Table(name="Member")
public class Member extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String email;
    private String nickname;
    private String password;
    private Boolean socialLogin;
    private Boolean cashed;
    private LocalDateTime cashedDate;

}
