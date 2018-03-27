import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable()
export class HttpService {
    private token: string;

    constructor(private http: HttpClient,
        private message: NzMessageService,
        private router: Router) {}

    getToken(): void {
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
    }

    // 处理后端返回的错误
    private handleError(res) {
        if (res.result) {
            if (res.result !== "ok") {
                if (res.reason) {
                    this.message.error(`${res.reason}`);
                }
                else {
                    this.message.error("reason字段不存在");
                }
            }
        }
        else {
            this.message.error("result字段不存在");
        }
    }

    // 登录请求
    postLogin(
        uri: string,
        body: string,
        successCall: (res) => void,
        failCall: (err) => void,
        completeCall: () => void): void {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        this.http.post(uri, body, httpOptions).pipe(
            map((res: any) => res.json())
        );
        this.http.post(uri, body, httpOptions).subscribe(
            (res) => {
                successCall(res);
            },
            (err) => {
                failCall(err);
                if (typeof (err.error) === "string") {
                    // "Bad Request, Invalid credentials"
                    if (err.error.indexOf("Invalid credentials") !== -1) {
                        this.message.error("账户验证失败，请核对您的用户名和密码！");
                    }
                    // "Invalid JWT, User does not exist"
                    else if (err.error.indexOf("User does not exist") !== -1) {
                        this.message.error("用户名不存在！");
                    }
                    // "Invalid JWT header, Unsupported authorization type"
                    else if (err.error.indexOf("Unsupported authorization type") !== -1) {
                        this.message.error("不支持的授权类型！");
                    }
                    // "Invalid JWT header, Token missing"
                    else if (err.error.indexOf("Token missing") !== -1) {
                        this.message.error("令牌丢失！");
                    }
                    // "Invalid JWT header, Token contains spaces"
                    else if (err.error.indexOf("Token contains spaces") !== -1) {
                        this.message.error("令牌包含空格！");
                    }
                    // 未知错误
                    else {
                        this.message.error("未知错误" + err.error);
                    }
                }
                else {
                    this.message.error("服务器错误! ");
                }
            },
            () => { }
        );
    }

    // get方法
    httpGet(
        uri: string,
        successCall: (res) => void,
        failCall: (err) => void,
        completeCall: () => void): void {
        this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "JWT " + this.token
            })
        };
        this.http.get(uri, httpOptions).pipe(
            map((res: any) => res.json())
        );
        this.http.get(uri, httpOptions).subscribe(
            (res) => {
                successCall(res);
                this.handleError(res);
            },
            (err) => {
                failCall(err);
                if (typeof (err.error) === "string") {
                    if (err.error.indexOf("expired") !== -1) {
                        this.message.error("账户认证失效，请重新登录！");
                    }
                    else {
                        this.message.error("未知错误" + err.error);
                    }
                    this.router.navigate(["/login"]);
                }
                else {
                    this.message.error("服务器错误! ");
                }
            },
            () => { }
        );
    }

    // post方法
    httpPost(
        uri: string,
        body: string,
        successCall: (res) => void,
        failCall: (err) => void,
        completeCall: () => void): void {
        this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "JWT " + this.token
            })
        };
        if (uri.search("/upload") !== -1) {
            httpOptions.headers = new HttpHeaders({
                "Content-Type": "multipart/form-data"
            });
        }
        this.http.post(uri, body, httpOptions).pipe(
            map((res: any) => res.json())
        );
        this.http.post(uri, body, httpOptions).subscribe(
            (res) => {
                successCall(res);
                this.handleError(res);
            },
            (err) => {
                failCall(err);
                if (typeof (err.error) === "string") {
                    if (err.error.indexOf("expired") !== -1) {
                        this.message.error("账户认证失效，请重新登录！");
                        this.router.navigate(["/login"]);
                    }
                    else {
                        this.message.error("未知错误" + err.error);
                    }
                }
                else {
                    this.message.error("服务器错误! ");
                }
            },
            () => { }
        );
    }
}
