package com.example.proiect_scd.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;


@Entity
@Data
public class Country{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long population;
    private Long gdp;

    @ManyToOne
    @JoinColumn(name = "continent_id")
    @JsonBackReference
    private Continent continent;

    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Informations> informations;
}