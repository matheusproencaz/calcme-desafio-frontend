import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";
import { UserComponent } from "./pages/user/user.component";

const routes: Routes = [
  {
    path: "user",
    component: UserComponent,
  },
  {
    path: "form",
    component: FormComponent,
  },
  {
    path: "",
    redirectTo: "/user",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
