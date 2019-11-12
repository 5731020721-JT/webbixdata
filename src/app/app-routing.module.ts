import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { PageThreeComponent } from './page-three/page-three.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'first', component:  PageOneComponent},
  { path: 'second', component:  PageTwoComponent},
  { path: 'third', component:  PageThreeComponent}
];
export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
  
})
export class AppRoutingModule { }
