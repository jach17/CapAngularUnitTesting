import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'removeItem');
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save in localstoreage', () => {
    service.isLogged.subscribe({
      next: (data) => {
        expect(data).toBeTrue();
      },
    });
    service.saveToken('token-example');
    expect(localStorage.setItem).toHaveBeenCalledWith('TOKEN', 'token-example');
  });
  it('should get token from localstoreage', () => {
    service.getToken();

    expect(localStorage.getItem).toHaveBeenCalledWith('TOKEN');
  });
  it('should remove token from localstoreage', () => {
    service.isLogged.subscribe({
      next: (data) => {
        expect(data).toBeFalse();
      },
    });
    service.deleteToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('TOKEN');
  });
});
