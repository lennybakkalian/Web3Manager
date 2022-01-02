import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PageWrapperComponent} from "./page-wrapper.component";
import {HomeComponent} from "./pages/home/home.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PendingChangesGuard} from "./misc/pending-changes.guard";
import {ContractComponent} from "./pages/contracts/contract.component";

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
          path: 'contract/:id',
          component: ContractComponent
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
