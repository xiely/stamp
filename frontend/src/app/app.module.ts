import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { NZ_MESSAGE_CONFIG, NgZorroAntdModule } from "ng-zorro-antd";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./auth-guard.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { HttpService } from "./http.service";
import { LoginComponent } from "./login/login.component";
import { MaxLengthValidatorDirective } from "./max-length.directive";
import { SharedService } from "./shared.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MaxLengthValidatorDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [
        AuthGuard,
        SharedService,
        HttpService,
        {
            provide: NZ_MESSAGE_CONFIG, useValue: {
                nzDuration: 3000,
                nzMaxStack: 1
            }
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
