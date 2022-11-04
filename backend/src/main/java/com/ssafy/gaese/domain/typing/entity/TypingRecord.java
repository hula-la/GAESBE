//package com.ssafy.gaese.domain.typing.entity;
//
//import com.ssafy.gaese.domain.user.entity.User;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.CreationTimestamp;
//import org.springframework.data.annotation.CreatedDate;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Table(name = "TypingRecord")
//public class TypingRecord
//{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "id")
//    private User user_id;
//
//    @Column
//    @CreationTimestamp
//    private String date;
//
//    @Column
//    private Integer rank;
//
//    @Column
//    private Integer typeSpeed;
//
//    @Column(length = 20)
//    private String langType;
//
//}
