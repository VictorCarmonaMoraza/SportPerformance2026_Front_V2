import { Component } from '@angular/core';
import { EvolutionGraph } from "../../../shared/components/evolution-graph/evolution-graph";
import { EvolutionByMonth } from "../../../shared/components/evolution-by-month/evolution-by-month";
import { EvolutionByWeek } from "../../../shared/components/evolution-by-week/evolution-by-week";
import { EvolutionByYear } from "../../../shared/components/evolution-by-year/evolution-by-year";

@Component({
  selector: 'app-user-info-page',
  imports: [EvolutionGraph, EvolutionByMonth, EvolutionByWeek, EvolutionByYear],
  templateUrl: './user-info-page.html',
  styleUrl: './user-info-page.css',
})
export class UserInfoPage {

  diasDelMes = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  ];
}
