package com.example.proiect_scd.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
public class Continent{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double area;

    @OneToMany(mappedBy = "continent", cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<Country> countries;

}