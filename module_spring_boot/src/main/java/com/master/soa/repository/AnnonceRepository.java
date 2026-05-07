package com.master.soa.repository;

import com.master.soa.entity.Annonce;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AnnonceRepository  extends  JpaRepository<Annonce, Long> {
    List<Annonce> findByCategorie(String categorie);
    List<Annonce> findByVille(String ville);
    List<Annonce> findByType(String type);
    List<Annonce> findByStatut(String statut);
}