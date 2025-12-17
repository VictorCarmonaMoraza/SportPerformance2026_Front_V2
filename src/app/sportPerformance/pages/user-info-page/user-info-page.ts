import { Component } from '@angular/core';
import { EvolutionByMonth } from "../../../shared/components/evolution-by-month/evolution-by-month";
import { EvolutionByWeek } from "../../../shared/components/evolution-by-week/evolution-by-week";
import { EvolutionByYear } from "../../../shared/components/evolution-by-year/evolution-by-year";

@Component({
  selector: 'app-user-info-page',
  imports: [EvolutionByMonth, EvolutionByWeek, EvolutionByYear],
  templateUrl: './user-info-page.html',
  styleUrl: './user-info-page.css',
})
export class UserInfoPage {
  title = '';
}
