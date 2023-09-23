import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetComponent } from './Auth/forget/forget.component';
import { LoginComponent } from './Auth/login/login.component';
import { LogoutComponent } from './Auth/logout/logout.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NotfoundComponent } from './Layout/notfound/notfound.component';
import { adminGuard } from './Services/admin.guard';
import { afterLoginGuard } from './Services/after-login.guard';
import { beforeLoginGuard } from './Services/before-login.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component : DashboardComponent
  },
  {
    path : 'admin',
    component:AdminDashboardComponent,
    canActivate:[afterLoginGuard,adminGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[beforeLoginGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[beforeLoginGuard]
  },
  {
    path:'logout',
    component:LogoutComponent,
    canActivate:[afterLoginGuard]
  },
  {
    path:'forget',
    component:ForgetComponent,
    canActivate:[beforeLoginGuard]
  },
  {
    path:'**',
    component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
