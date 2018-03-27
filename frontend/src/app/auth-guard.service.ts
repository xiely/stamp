import { CanActivate, Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    private token: string;
    constructor(private router: Router,
        private message: NzMessageService) {}

    // 判断登录状态
    canActivate(): boolean {
        this.token = "";
        let arr = JSON.parse(localStorage.getItem("v_sys"));
        if (arr !== null) {
            for (const obj of arr) {
                if (obj.userName === localStorage.getItem("phoneName")) {
                    this.token = obj.token;
                }
            }
        }
        else {
            arr = [];
        }
        if (this.token) {
            return true;
        }
        else {
            this.message.error("账户认证失效，请重新登录！");
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
