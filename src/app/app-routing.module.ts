import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule)
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'plans',
    loadChildren: () =>
      import('./pages/plans/plans.module').then((m) => m.PlansModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./pages/subscriptions/subscriptions.module').then(
        (m) => m.SubscriptionsModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'subscribe',
    loadChildren: () =>
      import('./pages/subscribe/subscribe.module').then(
        (m) => m.SubscribeModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
