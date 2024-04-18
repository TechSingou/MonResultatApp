package com.techml.monResultat.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MonResultatRequestDto {
    private String centre;
    private String serie;
    private int numPlace;
    private String annee;
}
