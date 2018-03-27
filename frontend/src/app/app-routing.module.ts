import { AuthGuard } from "./auth-guard.service";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: "",
            redirectTo: "login",
            pathMatch: "full"
        },
        {
            path: "login",
            component: LoginComponent
        },
    ])],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
