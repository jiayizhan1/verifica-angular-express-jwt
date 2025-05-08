import { Component, OnInit } from '@angular/core';
import { AutoService } from '../services/auto.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
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
        this.modelli = [];
        for (const a of auto) {
          this.modelli.push(...a.modelli);
        }
      });
    });
  }

  marcheSelezionate: string[] = [];

  onCheckboxChange(event: any, marca: string) {
    if (event.target.checked) {
      this.marcheSelezionate.push(marca);
    } else {
      this.marcheSelezionate = this.marcheSelezionate.filter(
        (m) => m !== marca
      );
    }

    this.autoService
      .getModelliByMarche(this.marcheSelezionate)
      .subscribe((modelli: any) => {
        this.modelli = [...modelli];
      });
  }
}
