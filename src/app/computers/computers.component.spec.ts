import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { ComputersService } from '../services/computers.service';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

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
});
