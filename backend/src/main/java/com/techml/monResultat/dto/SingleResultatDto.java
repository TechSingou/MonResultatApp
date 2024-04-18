package com.techml.monResultat.dto;

import lombok.Data;

import java.util.Date;

@Data
public class SingleResultatDto {
    private int numPlace;
    private String nom;
    private String prenom;
    private String sexe;
    private Date dateNaissance;
    private String lieuNaissance;
    private String etablisement;
    private String centre;
    private String serie;
    private String annee;
    private String mention;
}
