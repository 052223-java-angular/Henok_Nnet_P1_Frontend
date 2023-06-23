import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FeedComponent } from './pages/feed/feed.component';
import { TermsNconditionsComponent } from './pages/terms-nconditions/terms-nconditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ManageComponent } from './pages/manage/manage.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'termsNconditions', component:TermsNconditionsComponent},
  {path: 'privacyPolicy', component:PrivacyPolicyComponent},
  {path: 'post', component:PostComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'manage', component: ManageComponent},
  


  
  {path: '**', component: NotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
