import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'mobile',
    loadChildren:()=>import('./components/core/mobile/mobile.module').then(mod=>mod.MobileModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./components/core/auth/auth.module').then(mod=>mod.AuthModule)
  },
  {
    path:'category',
    loadChildren:()=>import('./components/core/category/category.module').then(mod=>mod.CategoryModule)
  },
  {
    path:'question',
    loadChildren:()=>import('./components/core/question/question.module').then(mod=>mod.QuestionModule)
  },
  {
    path:'answer',
    loadChildren:()=>import('./components/core/answer/answer.module').then(mod=>mod.AnswerModule)
  },
  {
    path:'**',
    redirectTo:'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
