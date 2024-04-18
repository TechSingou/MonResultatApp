package com.techml.monResultat.repository;

import com.techml.monResultat.entity.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
    @Query("select c from Candidat c where c.centre=:centre and c.serie=:serie and c.numPlace=:numPlace and c.annee=:annee")
    Candidat  trouverResultat_par_centre_serie_numPlace_annee(@Param("centre") String centre,@Param("serie") String serie,@Param("numPlace") int numPlace,@Param("annee") String annee);

    @Query("select c from Candidat c where c.centre=:centre and c.serie=:serie and c.annee=:annee")
    List<Candidat> trouverResultat_par_centre_serie_annee(@Param("centre") String centre,@Param("serie") String serie,@Param("annee") String annee);

    @Query("select c from Candidat c where c.centre=:centre and c.annee=:annee and c.mention=:mention")
    List<Candidat> trouverResultat_par_centre_annee_mention(String centre, String annee, String mention);
}
