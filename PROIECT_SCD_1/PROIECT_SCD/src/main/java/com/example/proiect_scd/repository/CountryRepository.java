package com.example.proiect_scd.repository;

import com.example.proiect_scd.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> findByContinentName(String continentName);
}