package com.master.p2p_node.Service;

import com.master.p2p_node.entity.Annonce;
import com.master.p2p_node.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AnnonceService {
    private final AnnonceRepository repo;

    public AnnonceService(AnnonceRepository repo) {
        this.repo = repo;
    }

    public Annonce create(Annonce annonce) {
        annonce.setStatut("EN_ATTENTE");
        Annonce saved = repo.save(annonce);

        // Appel au microservice de modération
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:3000/moderation";

        restTemplate.postForObject(url, saved, String.class);

        return saved;
    }


    public List<Annonce> getAll() {
        return repo.findAll();
    }
}
