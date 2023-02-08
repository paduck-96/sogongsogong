package com.gmail.kangjideok.sogong.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass //따로 테이블 생성 안됨
@EntityListeners(value = { AuditingEntityListener.class })
@Getter
abstract class BaseEntity {
    @CreatedDate
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createDate;
    @LastModifiedDate
    @Column(name ="modifyDate" )
    private LocalDateTime modifyDate;
}
