package com.gmail.kangjideok.sogong.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
//@ToString(exclude = "member")
@Table(name="Article")
public class Article extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="article_id")
    private Long articleId;
    @Column(name="article_title", nullable = false)
    private String articleTitle;
    @Column(name="article_content", nullable = false)
    private String articleContent;

//    @ManyToOne(fetch = FetchType.LAZY)
//    private Member member;
}
