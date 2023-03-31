import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Computer } from '../model/computer.model';

@Injectable({
  providedIn: 'root',
})
export class ComputersService {
  constructor(private http: HttpClient) {}

  getComputers() {
    return this.http.get<Computer[]>('http://localhost:3000/computers');
  }

  getComputerByid(id: number) {
    return this.http.get<Computer>('http://localhost:3000/computers/' + id);
  }

  saveComputer(data: Computer) {
    return this.http.post('http://localhost:3000/computers', data);
  }
  delteComputer(id: number) {
    return this.http.delete('http://localhost:3000/computers/' + id);
  }
  updateComputer(id: number, computer: Computer) {
    return this.http.put<Computer>(
      'http://localhost:3000/computers/' + id,
      computer
    );
  }
}
