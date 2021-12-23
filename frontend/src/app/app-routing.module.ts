import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PageWrapperComponent} from "./page-wrapper.component";
import {HomeComponent} from "./pages/home/home.component";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      component: PageWrapperComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: HomeComponent
        }
      ]
    },
    {
      path: 'login',
      pathMatch: 'full',
      component: LoginComponent
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
