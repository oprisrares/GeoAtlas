package com.example.proiect_scd.repository;

import com.example.proiect_scd.model.Informations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InformationsRepository extends JpaRepository<Informations, Long> {
    List<Informations> findByCountryId(Long id);
}
