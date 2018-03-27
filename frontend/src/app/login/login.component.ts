import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { HttpService } from "../http.service";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import { SharedService } from "../shared.service";
import { maxLengthValidator } from "../max-length.directive";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    userName: string;
    password: string;
    isShowTitle = true;
    errString = "提示信息";
    inputLock = false;

    constructor(
        private router: Router,
        private http: HttpService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private sharedService: SharedService,
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            "userName": new FormControl("this.userName", [Validators.required]),
            "password": new FormControl("this.password", [Validators.required])
        });
    }
    // 登录
    onLoginBtnClicked(): void {
        if (this.userName === "" || !this.userName ) {
            this.isShowTitle = false;
            this.errString = "用户名不能为空";
            return;
        }
        if (this.password === "" || !this.password) {
            this.isShowTitle = false;
            this.errString = "密码不能为空";
            return;
        }
        if (!new RegExp("^[1][3,4,5,7,8][0-9]{9}$").test(this.userName)) {
            this.errString = "请输入符合规则的手机号";
        }
        if (!new RegExp("^[0-9A-Za-z]{6,16}$").test(this.password) ) {
            this.errString = "请输入6-16位密码、数字字母或者混合";
        }
        const query = {
            "username": this.userName,
            "password": this.password
        };
        // this.sharedService.isSpinning = true;
        // this.http.postLogin(
        //     this.sharedService.baseUri + "/login",
        //     JSON.stringify(query),
        //     (value) => {
        //         if (!value) {
        //             this.sharedService.isSpinning = false;
        //             this.message.error("服务器返回的数据为null！");
        //             return;
        //         }
        //         else {
        //         }
        //     },
        //     (err) => {
        //         this.sharedService.isSpinning = false;
        //     },
        //     () => { }
        // );
    }

    // 明密文密码切换
    switchPwd(inputEle: HTMLInputElement): void {
        if (inputEle.type === "password") {
            inputEle.type = "text";
        }
        else if (inputEle.type === "text") {
            inputEle.type = "password";
        }
    }

    checkEmpty(textcontent): void {
        if (textcontent === "username") {
            if (this.userName === "" || !this.userName) {
                this.isShowTitle = false;
                this.errString = "用户名不能为空";
                return;
            }
            else {
                this.isShowTitle = true;
            }
        }
        if (textcontent === "password") {
            if (this.password === "" || !this.password) {
                this.isShowTitle = false;
                this.errString = "密码不能为空";
                return;
            }
            else {
                this.isShowTitle = true;
            }
        }
    }

    // 解决手机号在中文输入法下能输入非数字字符的问题
    onPhoneInput(event: any): void {
        if (!this.inputLock) {
            event.target.value = event.target.value.replace(/[^\d]/g, "");
        }
    }

    oncomposition(event: any, str: string): void {
        if (str === "start") {
            this.inputLock = true;
        }
        else {
            this.inputLock = false;
            event.target.value = event.target.value.replace(/\D+/g, "");
        }
    }

}

