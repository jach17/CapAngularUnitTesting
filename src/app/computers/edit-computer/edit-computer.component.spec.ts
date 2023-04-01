import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { ComputersService } from 'src/app/services/computers.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NEVER } from 'rxjs';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;
  let computerServiceSpy = jasmine.createSpyObj<ComputersService>(
    'ComputerService',
    ['updateComputer', 'getComputerByid']
  );

  let activatedRouterSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    ['params']
  );

  activatedRouterSpy.params = NEVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputersService, useValue: computerServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouterSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
