package com.techml.monResultat.web;

import com.techml.monResultat.dto.*;
import com.techml.monResultat.entity.Candidat;
import com.techml.monResultat.mapper.CandidatMapper;
import com.techml.monResultat.service.MonResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
public class ExamenRestController {
    private MonResultatService monResultatService;
    private CandidatMapper candidatMapper;

    @Autowired
    public ExamenRestController(MonResultatService monResultatService, CandidatMapper candidatMapper) {
        this.monResultatService = monResultatService;
        this.candidatMapper = candidatMapper;
    }

    @PostMapping("/ajouterResultat")
    public List<Candidat> AjouterResultat(@RequestBody ResultatResquestDto resultatResquestDto) {
        List<Candidat> candidatList = resultatResquestDto.getSingleResultatDtos().stream().map(singleResultatDto -> {
            return candidatMapper.fromSingleResutat(singleResultatDto);
        }).collect(Collectors.toList());

        List<Candidat> candidatList1 = monResultatService.AjouterResultat(candidatList);
        return candidatList1;
    }

    @GetMapping("/monResultat")
    public CandidatResponseDto trouverResultat_par_centre_serie_numPlace_annee(@RequestParam String centre, @RequestParam String serie, @RequestParam String numPlace, @RequestParam String annee) {
        return candidatMapper.fromCandidat(monResultatService.trouverResultat_par_centre_serie_numPlace_annee(centre, serie, Integer.valueOf(numPlace), annee));
    }

    @GetMapping("/resultatCentre")
    public List<CandidatResponseDto> trouverResultat_par_centre_serie_annee(@RequestParam String centre, @RequestParam String serie, @RequestParam String annee) {
        List<Candidat> candidatList = monResultatService.trouverResultat_par_centre_serie_annee(centre, serie, annee);

        if (candidatList.isEmpty())
            return null;
        List<CandidatResponseDto> candidatResponseDtoList = candidatList.stream().map(c -> candidatMapper.fromCandidat(c)).collect(Collectors.toList());
        return candidatResponseDtoList;
    }
}
