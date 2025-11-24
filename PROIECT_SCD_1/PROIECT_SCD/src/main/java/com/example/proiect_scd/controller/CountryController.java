package com.example.proiect_scd.controller;

import com.example.proiect_scd.model.Country;
import com.example.proiect_scd.repository.CountryRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin
public class CountryController {
    private final CountryRepository repo;

    public CountryController(CountryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Country> getAll() {
        return repo.findAll();
    }

    @GetMapping("/continent/{name}")
    public List<Country> getByContinent(@PathVariable String name) {
        return repo.findByContinentName(name);
    }

    @PostMapping
    public Country add(@RequestBody Country c) {
        return repo.save(c);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
