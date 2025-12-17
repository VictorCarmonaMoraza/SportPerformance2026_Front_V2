import { Routes } from "@angular/router";
import { SportLayout } from "./layout/sport-layout/sport-layout";
import { UserInfoPage } from "./pages/user-info-page/user-info-page";
import { UserMetricsPage } from "./pages/user-metrics-page/user-metrics-page";


export const sportRoutes: Routes = [
  {
    path: '',
    component: SportLayout,
    children: [
      { path: 'user-sport/:id', component: UserInfoPage },
      { path: 'user-metrics', component: UserMetricsPage },
      { path: '**', redirectTo: 'user-sport' }
    ]
  },
];

export default sportRoutes;
