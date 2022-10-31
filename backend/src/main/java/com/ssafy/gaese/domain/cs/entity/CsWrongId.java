package com.ssafy.gaese.domain.cs.entity;

import com.ssafy.gaese.domain.user.entity.User;

import javax.persistence.*;

import java.io.Serializable;

import static javax.persistence.FetchType.LAZY;

@Embeddable
public class CsWrongId implements Serializable {
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private CsProblem problem;
}
