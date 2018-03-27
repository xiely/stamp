export class DateFormat {
    date: Date;
    timeString: string = null;

    constructor(timeInput: any) {
        if (typeof timeInput === "string") {
            this.date = new Date(timeInput);
        }
        else if (typeof timeInput === "number") {
            this.date = new Date(timeInput * 1000);
        }
        else if (!timeInput) {
            this.date = new Date();
        }
    }

    Format(fmt: string): string {
        const dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const o = {
            "M+": this.date.getMonth() + 1, // 月份
            "d+": this.date.getDate(), // 日
            "h+": this.date.getHours(), // 小时
            "m+": this.date.getMinutes(), // 分
            "s+": this.date.getSeconds(), // 秒
            "q+": Math.floor((this.date.getMonth() + 3) / 3), // 季度
            "S": this.date.getMilliseconds(), // 毫秒
            "w": dayNames[this.date.getDay()]
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
}
