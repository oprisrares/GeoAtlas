package com.example.proiect_scd.controller;

import com.example.proiect_scd.model.Continent;
import com.example.proiect_scd.repository.ContinentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/continents")
@CrossOrigin
public class ContinentController {
    private final ContinentRepository repo;

    public ContinentController(ContinentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Continent> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Continent add(@RequestBody Continent c) {
        return repo.save(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

}
