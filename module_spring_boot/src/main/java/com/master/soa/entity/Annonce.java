package com.master.soa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Annonce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 100)
    private String titre;

    @NotBlank(message = "La description est obligatoire")
    @Size(max = 500)
    private String description;

    @NotNull(message = "Le prix est obligatoire")
    @Positive(message = "Le prix doit être positif")
    private Double prix;

    @NotBlank(message = "La catégorie est obligatoire")
    private String categorie;

    @NotBlank(message = "La ville est obligatoire")
    private String ville;

    private String type; // si vous conservez ce champ

    private String statut; // EN_ATTENTE, APPROUVEE, REJETEE, PUBLIE
}