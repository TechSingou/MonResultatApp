import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacResultatService {
  public host: string = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  public saveCandidats(candidatList: any): Observable<any> {
    return this.httpClient.post<any>(this.host + "/ajouterResultat", { singleResultatDtos: candidatList });
  }

  getResultatByCandidat(centre: string, serie: string, numPlace: number, annnee: string): Observable<any> {
    // Convert the payload object into URL parameters
    const params = new HttpParams({ fromObject: { centre: centre, serie: serie, numPlace: numPlace, annee: annnee } });
    return this.httpClient.get<any>(this.host + "/monResultat", { params: params });

  }

  getResultatBySerie(centre: string, serie: string, annee: string): Observable<any> {
    const params = new HttpParams({ fromObject: { centre: centre, serie: serie, annee: annee } });
    return this.httpClient.get<any>(this.host + "/resultatCentre", { params: params });
  }

}
