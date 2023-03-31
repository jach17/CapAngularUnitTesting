import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComputersService } from '../../services/computers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-computer',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.css'],
})
export class NewComputerComponent {
  formComputer?: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ComputersService,
    private router: Router
  ) {
    this.formComputer = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
    });
  }

  saveComputer() {
    let data = this.formComputer?.value;
    this.service.saveComputer(data).subscribe({
      next: () => {
        this.router.navigate(['computers']);
      },
      error: () => {
        alert('Ocurrió un error al insertar');
      },
    });
  }
}
