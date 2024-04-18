import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenCentreDeCorrectionBAC, ExamenCentreDeCorrectionCAP_BT1_BT2, ExamenCentreDeCorrectionDEF, ExamenEnum, SerieBacGeneral, SerieBacTechnique } from '../model/data.enum';
import { BacResultatService } from '../services/bac-resultat.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  searchForm!: FormGroup;
  examenEnum = Object.values(ExamenEnum);
  centreDeCorrection!: any
  examenCentreDeCorrectionBAC = Object.values(ExamenCentreDeCorrectionBAC);
  examenCentreDeCorrectionDEF = Object.values(ExamenCentreDeCorrectionDEF);
  examenCentreDeCorrectionCAP_BT1_BT2m = Object.values(ExamenCentreDeCorrectionCAP_BT1_BT2)
  serieBacGeneral = Object.values(SerieBacGeneral);
  serieBacTechnique = Object.values(SerieBacTechnique);
  serieBac!: any;
  isCentreRequired: boolean = false;
  IsSerieRequired: boolean = false;
  isSearchFormsubmitted: boolean = false;
  selectedExam: any = null;
  formDataRequest: any = null;
  candidat!: any;
  candidatList!: any;
  errorMessage!: string;
  displayedMessage = ""
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  pageCandidats: any;

  constructor(private formBuilder: FormBuilder, private bacResultatService: BacResultatService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      examen: ['', Validators.required],
      annee: ['', Validators.required],
      centre: [''],
      serie: [''],
      numPlace: ['']
    });
  }

  submitSearchForm() {
    this.isSearchFormsubmitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    if (this.searchForm.valid) {
      // Handle form submission logic here
      console.log('Form submitted');
      console.log('Form value:', this.searchForm.value);

      // Call Bac Resultat API
      if ((this.selectedExam === ExamenEnum.BAC_GEN) || (this.selectedExam === ExamenEnum.BAC_TEC)) {
        if (this.searchForm.get('numPlace')?.value && this.searchForm.get('numPlace')?.value.trim().length > 0) {
          //Rechercher le resultat avec num
          console.log("Num present");
          this.bacResultatService.getResultatByCandidat(this.searchForm.get('centre')?.value, this.searchForm.get('serie')?.value, this.searchForm.get('numPlace')?.value, this.searchForm.get('annee')?.value).subscribe({
            next: (data) => {
              if (data === null) {
                this.displayedMessage = "Recherche infructueuse !";
              }
              this.candidat = data;
              this.candidatList = null; // To reset the value
            },
            error: (err) => {
              this.errorMessage = err;
            }
          })

        } else {
          //Rechercher le resultat sans num(par serie)
          console.log("Num absent");
          this.bacResultatService.getResultatBySerie(this.searchForm.get('centre')?.value, this.searchForm.get('serie')?.value, this.searchForm.get('annee')?.value).subscribe({
            next: (data) => {
              if (data === null) {
                this.displayedMessage = "Recherche infructueuse !";
              }
              this.candidatList = data;
              this.candidat = null; // To reset the value
              this.currentPage = 0;
              this.getPageCandidat();
            },
            error: (err) => {
              this.errorMessage = err;
            }
          })
        }
      }
    }
  }

  getPageCandidat() {
    //extract a page of candidat to the whole list
    let index = this.currentPage * this.pageSize;
    this.totalPages = ~~(this.candidatList.length / this.pageSize);
    if (this.candidatList.length % this.pageSize != 0)
      this.totalPages++;
    this.pageCandidats = this.candidatList.slice(index, index + this.pageSize);
  }

  gotoPage(i: number) {
    this.currentPage = i;
    this.getPageCandidat();
  }


  // To contextualize many and validations
  onExamenChange(event: Event) {
   // if (this.searchForm.invalid) {
      //console.log("yess");
   // }
    // To initialise the form
    this.initializeForm();

    this.selectedExam = (event.target as HTMLSelectElement).value;
    if (this.selectedExam === ExamenEnum.BAC_GEN) {
      this.centreDeCorrection = this.examenCentreDeCorrectionBAC;
      this.serieBac = this.serieBacGeneral;
      this.searchForm.get('centre')?.setValidators([Validators.required]);
      this.searchForm.get('serie')?.setValidators([Validators.required]);
      this.isCentreRequired = true;
      this.IsSerieRequired = true;
    } else if (this.selectedExam === ExamenEnum.BAC_TEC) {
      this.centreDeCorrection = this.examenCentreDeCorrectionBAC;
      this.serieBac = this.serieBacTechnique;
      this.searchForm.get('centre')?.setValidators([Validators.required]);
      this.searchForm.get('serie')?.setValidators([Validators.required]);
      this.isCentreRequired = true;
      this.IsSerieRequired = true;
    } else if (this.selectedExam === ExamenEnum.DEF) {
      this.centreDeCorrection = this.examenCentreDeCorrectionDEF;
      this.serieBac = null;
      this.searchForm.get('serie')?.clearValidators();
      this.searchForm.get('centre')?.setValidators([Validators.required]);
      this.isCentreRequired = true;
      this.IsSerieRequired = false;
    } else if ((this.selectedExam === ExamenEnum.BT1) || (this.selectedExam === ExamenEnum.BT2) || (this.selectedExam === ExamenEnum.CAP)) {
      this.centreDeCorrection = this.examenCentreDeCorrectionCAP_BT1_BT2m;
      this.serieBac = null;
      this.searchForm.get('serie')?.clearValidators();
      this.searchForm.get('centre')?.setValidators([Validators.required]);
      this.isCentreRequired = true;
      this.IsSerieRequired = false;
    } else if (this.selectedExam === ExamenEnum.BTAGRO) {
      this.centreDeCorrection = null
      this.serieBac = null;
      this.searchForm.get('centre')?.clearValidators();
      this.searchForm.get('serie')?.clearValidators();
      this.isCentreRequired = false;
      this.IsSerieRequired = false;
    } else {
      this.searchForm.reset();
      //this.centreDeCorrection = null
      //this.serieBac = null;
    }

    this.searchForm.get('centre')?.updateValueAndValidity();
    this.searchForm.get('serie')?.updateValueAndValidity();
  }

  initializeForm() {
    this.searchForm.patchValue({
      annee: '',
      centre: '',
      serie: '',
      numPlace: ''
    })
  }

}
