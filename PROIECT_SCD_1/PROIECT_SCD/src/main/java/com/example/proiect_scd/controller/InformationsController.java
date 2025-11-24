package com.example.proiect_scd.controller;

import com.example.proiect_scd.model.Informations;
import com.example.proiect_scd.repository.InformationsRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/informations")
@CrossOrigin
public class InformationsController {
    private final InformationsRepository repo;

    public InformationsController(InformationsRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Informations> getAll() {
        return repo.findAll();
    }

    @GetMapping("/country/{id}")
    public List<Informations> getByCountryId(@PathVariable Long id) {
        return repo.findByCountryId(id);
    }


    @PostMapping
    public Informations add(@RequestBody Informations info) {
        return repo.save(info);
    }
}
