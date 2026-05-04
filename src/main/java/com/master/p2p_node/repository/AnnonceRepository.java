package com.master.p2p_node.repository;

import com.master.p2p_node.entity.Annonce;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AnnonceRepository  extends  JpaRepository<Annonce, Long> {
    List<Annonce> findByCategorie(String categorie);
    List<Annonce> findByVille(String ville);
    List<Annonce> findByType(String type);
    List<Annonce> findByStatut(String statut);
}