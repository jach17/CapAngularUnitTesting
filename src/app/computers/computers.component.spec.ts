import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { ComputersService } from '../services/computers.service';
import { MatTableModule } from '@angular/material/table';
import { of, Observable, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerServiceSpy = jasmine.createSpyObj<ComputersService>(
    'ComputerService',
    ['getComputers', 'delteComputer']
  );

  computerServiceSpy.getComputers.and.returnValue(of([]));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [{ provide: ComputersService, useValue: computerServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    let mockResponse = [
      {
        id: 1,
        brand: 'HP',
        model: '123D',
      } as Computer,
    ];
    computerServiceSpy.getComputers.and.returnValue(of(mockResponse));
    component.loadData();
    expect(component.computers.data.length).not.toEqual(0);
  });
  it('should load data - error', () => {
    computerServiceSpy.getComputers.and.returnValue(
      throwError(() => {
        'computers not found';
      })
    );
    component.loadData();
    expect(component.computers.data.length).toEqual(0);
  });
});
