import { Component, effect, inject } from '@angular/core';
import { EvolutionByMonth } from "../../../shared/components/evolution-by-month/evolution-by-month";
import { EvolutionByWeek } from "../../../shared/components/evolution-by-week/evolution-by-week";
import { EvolutionByYear } from "../../../shared/components/evolution-by-year/evolution-by-year";
import { SportService } from '../../../shared/services/sport-service';

@Component({
  selector: 'app-user-info-page',
  imports: [EvolutionByMonth, EvolutionByWeek, EvolutionByYear],
  templateUrl: './user-info-page.html',
  styleUrl: './user-info-page.css',
})
export class UserInfoPage {
  title = '';
  peso = ''
  calorias = ''
  private sportService = inject(SportService);

  // 👉 recurso compartido
  readonly infoUserResource = this.sportService.infoUserResource;

  // 👉 derivado ya preparado
  readonly deportista = this.sportService.deportista;

  constructor() {
    effect(() => {
      const user = this.infoUserResource.value();
      if (!user) return;
      this.title = user.deportista.disciplina_deportiva;
      console.log('------>Info usuario:', user);
      console.log('------>Deportista:', user.deportista);
    });
  }

}
