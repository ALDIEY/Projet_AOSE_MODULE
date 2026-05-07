package com.master.soa.Controller;

import com.master.soa.Service.AnnonceService;
import com.master.soa.entity.Annonce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annonces")
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;

    // POST /annonces - Créer une annonce (statut EN_ATTENTE)
    @PostMapping
    public ResponseEntity<Annonce> create(@RequestBody Annonce annonce) {
        Annonce created = annonceService.create(annonce);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // GET /annonces - Lister toutes les annonces
    @GetMapping
    public List<Annonce> getAll() {
        return annonceService.getAll();
    }

    // GET /annonces/{id} - Détail d'une annonce
    @GetMapping("/{id}")
    public ResponseEntity<Annonce> getById(@PathVariable Long id) {
        return annonceService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /annonces/{id}/soumettre - Soumettre à la modération
    @PostMapping("/{id}/soumettre")
    public ResponseEntity<?> soumettre(@PathVariable Long id) {
        try {
            annonceService.soumettre(id);
            return ResponseEntity.ok().body("Annonce soumise à la modération");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PATCH /annonces/{id}/publier - Publier l'annonce (appelé par moderation-service)
    @PatchMapping("/{id}/publier")
    public ResponseEntity<?> publier(@PathVariable Long id) {
        try {
            Annonce annonce = annonceService.publier(id);
            return ResponseEntity.ok(annonce);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint interne pour que moderation-service puisse rejeter l'annonce
    @PatchMapping("/{id}/rejeter")
    public ResponseEntity<?> rejeter(@PathVariable Long id) {
        try {
            Annonce annonce = annonceService.rejeter(id);
            return ResponseEntity.ok(annonce);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}