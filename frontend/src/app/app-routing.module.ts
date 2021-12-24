import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PageWrapperComponent} from "./page-wrapper.component";
import {HomeComponent} from "./pages/home/home.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PendingChangesGuard} from "./misc/pending-changes.guard";

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
        },
        {
          path: 'settings',
          component: SettingsComponent,
          canDeactivate: [PendingChangesGuard]
        },
        {
          path: 'lookup',
          loadChildren: () => import('./lookup/look-up.module').then(m => m.LookUpModule)
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
