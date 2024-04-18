package com.techml.monResultat.service;
import com.techml.monResultat.entity.Candidat;
import com.techml.monResultat.mapper.CandidatMapper;
import com.techml.monResultat.repository.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service

public class MonResultatServiceImpl implements MonResultatService {
    private CandidatRepository candidatRepository;
    private CandidatMapper candidatMapper;

    @Autowired
    public MonResultatServiceImpl(CandidatRepository candidatRepository, CandidatMapper candidatMapper) {
        this.candidatRepository = candidatRepository;
        this.candidatMapper = candidatMapper;
    }

    @Override
    public List<Candidat> AjouterResultat(List<Candidat> candidatList) {

        Set<String> existingCandidateKeys = new HashSet<>();

        List<Candidat> existingCandidates = candidatRepository.findAll();
        if (existingCandidates != null) {
            for (Candidat candidat : existingCandidates) {
                String candidateKey = generateCandidateKey(candidat);
                existingCandidateKeys.add(candidateKey);
            }
        }
        //System.out.printf(existingCandidateKeys.toString());

        Set<Candidat> candidatesToSave = new HashSet<>();
        for (Candidat candidat : candidatList) {
            String candidateKey = generateCandidateKey(candidat);
            if (!existingCandidateKeys.contains(candidateKey)) {
                candidatesToSave.add(candidat);
                existingCandidateKeys.add(candidateKey);
            }
        }

        return candidatRepository.saveAll(candidatesToSave);
    }

    private String generateCandidateKey(Candidat candidat) {
        return candidat.getNumPlace() + "-" + candidat.getCentre();
        }



    @Override
    public Candidat trouverResultat_par_centre_serie_numPlace_annee(String centre, String serie, int numPlace, String annee) {
        return candidatRepository.trouverResultat_par_centre_serie_numPlace_annee(centre, serie, numPlace, annee);
    }

    @Override
    public List<Candidat> trouverResultat_par_centre_serie_annee(String centre, String serie, String annee) {
        return candidatRepository.trouverResultat_par_centre_serie_annee(centre, serie, annee);
    }
}
