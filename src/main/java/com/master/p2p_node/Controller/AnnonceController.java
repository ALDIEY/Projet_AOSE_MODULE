package com.master.p2p_node.Controller;

import com.master.p2p_node.Service.AnnonceService;
import com.master.p2p_node.entity.Annonce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annonces")
public class AnnonceController {
    @Autowired
    private AnnonceService annonceService;

    @PostMapping
    public Annonce create(@RequestBody Annonce annonce) {
        return annonceService.create(annonce);
    }

    @GetMapping
    public List<Annonce> getAll() {
        return annonceService.getAll();
    }


}
