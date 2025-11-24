package com.example.proiect_scd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Informations{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Double GDP;
    private String mainIndustry;
    private String terrainType;
    private Double density;
    private Double urbanRate;

    @ManyToOne
    @JoinColumn(name = "country_id")
    @JsonBackReference
    private Country country;
}