import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { BacResultatService } from '../services/bac-resultat.service';

@Component({
  selector: 'app-add-resultat-examen',
  templateUrl: './add-resultat-examen.component.html',
  styleUrls: ['./add-resultat-examen.component.css']
})
export class AddResultatExamenComponent {
  fileForm!: FormGroup;
  isLoading = false;
  submitted = false;
  selectedFile: any;
  candidatListToSave!: any;
  errorMessage!: string;
  showConfirmation: boolean = false;
  displayedMessage = '';

  constructor(private formBuilder: FormBuilder, private bacResultatService: BacResultatService) { }

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
  }



  onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      if (this.selectedFile.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        console.log("correct");
      }
      else {
        //call validation
        this.fileForm.reset();
        this.fileForm.controls["file"].setValidators([Validators.required]);
        this.fileForm.get('file')?.updateValueAndValidity();
      }
    }
  }

  onCancel(): void {
    this.fileForm.reset();
  }

  onSubmit(): void {

    // const file = this.fileForm.value.file;
    this.isLoading = true;
    this.submitted = true;
    let conf = confirm('Etes-vous sure de publier ce document ?')
    if (conf == false) {
      this.isLoading = false;
      return;
    }

    // stop here if form is invalid
    if (this.fileForm.invalid) {
      return;
    }

    //console.log(event.target.files);
    //const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.selectedFile);
    fileReader.onload = (event) => {
      // console.log(event);
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' });
      workBook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
        //console.log(data[0]);
        this.candidatListToSave = data;

        //this.convertedJson = JSON.stringify(data,undefined,4);
      })

      //console.log(this.candidatList);
      this.bacResultatService.saveCandidats(this.candidatListToSave)
        .subscribe({
          next: (data) => {
            if (data.length > 0) {
              console.log(data);
              this.showConfirmation = true;
            }else{
              this.displayedMessage = "Ce resultat est déjà publié !"
              this.isLoading = false;
            }
          },
          error: (err) => {
            this.errorMessage = err;
            this.isLoading = false;
          }
        })
    }
  }

  uploadAgain() {
    this.showConfirmation = false;
    this.isLoading = false;
  }
}
