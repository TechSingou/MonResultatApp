import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ConcoursEnum,EniSpecialite,IFMNiveauEnum,ENSUPNiveau,CentreIFM } from '../model/data.enum'

@Component({
  selector: 'app-concours',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.css']
})
export class ConcoursComponent {

  searchForm!: FormGroup;

  constructor(private formBuilder:FormBuilder){}
  concoursEnumValues = Object.values(ConcoursEnum);
  eniSpecialiteValues = Object.values(EniSpecialite);
  iFMNiveauEnumValues = Object.values(IFMNiveauEnum);
  eNSUPNiveauValues = Object.values(ENSUPNiveau);
  centreIFMValues = Object.values(CentreIFM);
  specialiteList!: any;
  niveauList!: any;
  centreList!: any;
  errorMessage!: string;
  isSearchFormsubmitted = false;
  isCentreRequired = false;
  isSpecialiteRequired = false;
  isNiveauRequired = false;
  selectedNiveau:any = null;
  selectedConcours:any = null;


  ngOnInit():void{
    this.searchForm = this.formBuilder.group({
        typeConcours:['',Validators.required],
        annee:['',Validators.required],
        niveau:[''],
        centre:[''],
        specialite:[''],
        numPlace:['']
    });
  }

  submitSearchForm(){
    //Verifier si le formulaire est valide
    this.isSearchFormsubmitted = true;
    if(this.searchForm.invalid){
    return;
    }
    // Appel API Backend
    console.log(this.searchForm.value)
  }

  onConcoursChange(event:Event){
    this.initializeForm(); // reset everything except type examen
    this.selectedConcours = (event.target as HTMLSelectElement).value;
        if (this.selectedConcours === ConcoursEnum.ENTRE_ENI_ABT) {
          this.centreList = null; // pas besoin car il y a un seul centre au niveau national
          //this.niveauList = ['BAC']; // car le concours ne concerne que le niveau BAC
          this.niveauList = null;
          this.specialiteList = this.eniSpecialiteValues; // Initialize le champ specialité avec les specialités de ENI_ABP
          this.searchForm.get('specialite')?.setValidators([Validators.required]);
          this.isSpecialiteRequired = true;
          this.searchForm.get('centre')?.clearValidators();
          this.searchForm.get('niveau')?.clearValidators();
        } else if (this.selectedConcours === ConcoursEnum.ENTRE_IFM) {
          this.niveauList = this.iFMNiveauEnumValues;
          this.centreList = this.centreIFMValues;
          this.specialiteList = null; // la liste des specialités est à definir après en fonction du niveau
          this.searchForm.get('niveau')?.setValidators([Validators.required]);
          this.searchForm.get('centre')?.setValidators([Validators.required]);
          this.searchForm.get('centre')?.setValidators([Validators.required]);
        } else if (this.selectedConcours === ConcoursEnum.ENTRE_ENSUP) {
          this.niveauList = this.eNSUPNiveauValues;
          this.centreList = null;
           this.specialiteList = null;
           this.searchForm.get('specialite')?.clearValidators();
           this.searchForm.get('centre')?.clearValidators();
        }else {
          this.searchForm.reset();
          //this.centreDeCorrection = null
          //this.serieBac = null;
        }

        this.searchForm.get('centre')?.updateValueAndValidity();
        this.searchForm.get('specialite')?.updateValueAndValidity();
        this.searchForm.get('niveau')?.updateValueAndValidity();

  }

  onNiveauChange(event:Event){
  console.log("Niveau change ...")
  // Reset numPlace
    this.searchForm.patchValue({
      numPlace: '',
      specialite: ''
    })

    this.selectedNiveau = (event.target as HTMLSelectElement).value
    if(this.selectedNiveau === IFMNiveauEnum.DEF){
      this.specialiteList = ['GENERALISTE'];
      this.searchForm.get('specialite')?.setValidators([Validators.required]);
      this.isSpecialiteRequired = true;
    } else if(this.selectedNiveau === IFMNiveauEnum.BAC){
      this.specialiteList = ['SPECIALISTE'];
      this.searchForm.get('specialite')?.setValidators([Validators.required]);
      this.isSpecialiteRequired = true;
    } else if(this.selectedNiveau === ENSUPNiveau.BAC){
      this.specialiteList = ['SPECIALISTE1 BAC','SPECIALISTE2 BAC','SPECIALISTE2 BAC'];
      this.searchForm.get('specialite')?.setValidators([Validators.required]);
      this.isSpecialiteRequired = true;
    } else if(this.selectedNiveau === ENSUPNiveau.MASTER){
      this.specialiteList = ['SPECIALISTE 1 MASTER','SPECIALISTE 2 MASTER','SPECIALISTE 3 MASTER'];
      this.searchForm.get('specialite')?.setValidators([Validators.required]);
      this.isSpecialiteRequired = true;
    }
     this.searchForm.get('specialite')?.updateValueAndValidity();
  }

  initializeForm() {
      this.searchForm.patchValue({
        annee: '',
        niveau: '',
        centre: '',
        specialite : '',
        numPlace: ''
      })
    }

    // Afficher un text par defaut dans la liste deroulante "niveau"
    getDefaultSelectedNiveau():string{
      if(this.selectedConcours === ConcoursEnum.ENTRE_ENI_ABT){
        return  'BAC';
      }else if((this.selectedConcours === ConcoursEnum.ENTRE_IFM) || (this.selectedConcours === ConcoursEnum.ENTRE_IFM) || (this.selectedConcours === ConcoursEnum.ENTRE_ENSUP))
      {
        return 'Choisir';
      }else{
      return '';
      }
    }
}
