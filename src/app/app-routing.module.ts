import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'appHome',
    loadChildren: () => import('./app-home/app-home.module').then( m => m.AppHomePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
