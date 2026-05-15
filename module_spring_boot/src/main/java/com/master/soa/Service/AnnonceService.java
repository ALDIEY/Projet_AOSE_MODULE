package com.master.soa.Service;

import com.master.soa.entity.Annonce;
import com.master.soa.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.master.soa.entity.DTO.ModerationRequest; // adaptez le package
import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {

    private final AnnonceRepository repo;
    private final RestTemplate restTemplate;

    @Value("${moderation.service.url}")
    private String moderationUrl;

    public AnnonceService(AnnonceRepository repo, RestTemplate restTemplate) {
        this.repo = repo;
        this.restTemplate = restTemplate;
    }

    // Créer une annonce avec statut EN_ATTENTE (pas d'appel à la modération ici)
    public Annonce create(Annonce annonce) {
        annonce.setStatut("EN_ATTENTE");
        return repo.save(annonce);
    }

    public List<Annonce> getAll() {
        return repo.findAll();
    }

    public Optional<Annonce> getById(Long id) {
        return repo.findById(id);
    }

    // Soumettre l'annonce : déclenche l'appel au service de modération
    public void soumettre(Long id) {
        Annonce annonce = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée"));

        if (!"EN_ATTENTE".equals(annonce.getStatut())) {
            throw new RuntimeException("Seules les annonces en attente peuvent être soumises");
        }

        // Supprimez les 3 lignes suivantes :
        // String url = moderationUrl + "/moderations/request";
        // ModerationRequest request = new ModerationRequest(annonce.getId());
        // restTemplate.postForObject(url, request, String.class);

        // Ajoutez simplement un log si vous voulez
        System.out.println("Annonce " + id + " soumise à la modération (en attente de décision)");
    }

    // Méthode appelée par moderation-service quand l'annonce est approuvée
    public Annonce publier(Long id) {
        Annonce annonce = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée"));

        if (!"APPROUVEE".equals(annonce.getStatut()) && !"EN_ATTENTE".equals(annonce.getStatut())) {
            throw new RuntimeException("Impossible de publier une annonce qui n'est pas approuvée ou en attente");
        }
        annonce.setStatut("PUBLIE");
        return repo.save(annonce);
    }

    // Méthode appelée par moderation-service quand l'annonce est rejetée
    public Annonce rejeter(Long id) {
        Annonce annonce = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée"));
        annonce.setStatut("REJETEE");
        return repo.save(annonce);
    }

    // Dans AnnonceService
    public List<Annonce> getByVille(String ville) {
        return repo.findByVille(ville);
    }

    public List<Annonce> getByCategorie(String categorie) {
        return repo.findByCategorie(categorie);
    }
}