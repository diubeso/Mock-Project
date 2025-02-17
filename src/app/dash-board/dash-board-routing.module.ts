import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { LineareaChartsComponent } from './linearea-charts/linearea-charts.component';

const routes: Routes = [
  // { path: 'dashboard', redirectTo: 'dashboard/:Coutry', pathMatch: 'full' },
  {
    path: '',
    component: DashBoardComponent,
    children: [{ path: ':Coutry', component: LineareaChartsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardRoutingModule {}
