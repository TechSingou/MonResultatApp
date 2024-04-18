package com.techml.monResultat.mapper;

import com.techml.monResultat.dto.CandidatResponseDto;
import com.techml.monResultat.dto.ResultatResquestDto;
import com.techml.monResultat.dto.SingleResultatDto;
import com.techml.monResultat.entity.Candidat;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CandidatMapper {
    private ModelMapper modelMapper = new ModelMapper();

    public CandidatResponseDto fromCandidat(Candidat candidat) {
        if (candidat == null)
            return null;
        return modelMapper.map(candidat, CandidatResponseDto.class);
    }

    public Candidat fromSingleResutat(SingleResultatDto singleResultatDto) {
        return modelMapper.map(singleResultatDto, Candidat.class);
    }
}
