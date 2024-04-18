package com.techml.monResultat.service;

import com.techml.monResultat.dto.ResultatResquestDto;
import com.techml.monResultat.dto.SingleResultatDto;
import com.techml.monResultat.entity.Candidat;


import java.util.List;

public interface MonResultatService {
    public List<Candidat> AjouterResultat( List<Candidat> candidatList);
    public Candidat trouverResultat_par_centre_serie_numPlace_annee(String centre,String serie,int numPlace,String annee);
    public List<Candidat> trouverResultat_par_centre_serie_annee(String centre, String serie,String annee);

}
