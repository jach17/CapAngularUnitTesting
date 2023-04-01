import { Component } from '@angular/core';
import { ComputersService } from '../services/computers.service';
import { Computer } from '../model/computer.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions'];

  constructor(private service: ComputersService) {
    this.loadData();
  }

  loadData() {
    this.service.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (er) => {
        alert('Ha ocurrido un error en la consulta de computadoras');
      },
    });
  }

  deleteComputer(item: Computer) {
    this.service.delteComputer(item.id).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => {
        alert('Algo salio mal al eliminar');
      },
    });
  }
}
