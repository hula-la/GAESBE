package com.ssafy.gaese.domain.friends.entity;

import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Friends")
public class Friends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Date createdDate;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "firstUserId", referencedColumnName = "id")
    User firstUser;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "secondUserId", referencedColumnName = "id")
    User secondUser;

}
