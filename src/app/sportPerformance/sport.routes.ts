import { Routes } from "@angular/router";
import { SportLayout } from "./layout/sport-layout/sport-layout";
import { UserInfoPage } from "./pages/user-info-page/user-info-page";


export const sportRoutes: Routes = [
  {
    path: '',
    component: SportLayout,
    children: [
      { path: 'user-sport', component: UserInfoPage },
      // { path: 'training-metrics', component: TrainingMetricsPage },
      // { path: '**', redirectTo: 'user-sport' }
    ]
  },
];

export default sportRoutes;
