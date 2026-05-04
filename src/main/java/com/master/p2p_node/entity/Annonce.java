package com.master.p2p_node.entity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private Double prix;
    private String categorie;
    private String ville;
    private String type;

    private String statut; // EN_ATTENTE, VALIDEE, REJETEE
}
