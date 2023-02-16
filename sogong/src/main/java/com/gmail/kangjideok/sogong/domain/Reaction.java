package com.gmail.kangjideok.sogong.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "article")
@Table(name = "Reaction")
public class Reaction extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reaction_id")
    private Long reactionId;

    @Column(name="reaction_content", nullable = false)
    private String reactionContent;

    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;
}
