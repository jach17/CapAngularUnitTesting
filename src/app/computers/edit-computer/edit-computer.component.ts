import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComputersService } from '../../services/computers.service';
import { Computer } from 'src/app/model/computer.model';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  computerId = 0;
  formComputerEdit?: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ComputersService,
    private router: Router
  ) {
    this.formComputerEdit = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
    });

    this.route.params.subscribe({
      next: (params) => {
        this.computerId = params['id'];
        this.loadData();
      },
    });
  }

  loadData() {
    this.service.getComputerByid(Number(this.computerId)).subscribe({
      next: (computer: Computer) => {
        this.formComputerEdit?.patchValue(computer);
      },
      error: (err) => {
        alert('Ocurrió un error al cargar la infromación de la caomputadora');
      },
    });
  }
  updateComputer() {
    let dataToUpdate = this.formComputerEdit?.value;
    this.service.updateComputer(this.computerId, dataToUpdate).subscribe({
      next: () => {
        this.router.navigate(['computers']);
      },
      error: (err) => {
        alert('Ocurrió un error al actualizar');
      },
    });
  }
}
