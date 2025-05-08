import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoService } from '../services/auto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-insert',
  imports: [ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss',
})
export class InsertComponent {
  modelloForm = new FormGroup({
    modello: new FormControl(''),
    cilindrata: new FormControl(''),
    segmento: new FormControl(''),
    nPorte: new FormControl(''),
    vendite2024: new FormControl(''),
  });
  auto: any = null;
  modelli: any = null;

  constructor(
    private autoService: AutoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.login().subscribe((res) => {
      this.authService.setToken(res.token);

      this.autoService.getAll().subscribe((auto: any) => {
        this.auto = auto;
      });
    });
  }

  onSubmit() {
    console.log(this.modelloForm.value);
  }
}
