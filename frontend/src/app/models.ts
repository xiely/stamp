
// 会议素材
export class MeetingMatModel {
    type: string;
    title: string;
    theme: string;
    location: string;
    start_tm: any;
    end_tm: any;
    welcomes: string[];
    comment: string;
    theme_pic: MatObj;
    welcome_pic: MatObj;
}
// 酒店素材
export class HotelMatModel {
    type: string;
    material_using_loc: string[];
    carousel_pics: MatObj[];
    comment: string;
}

export class MatObj {
    type: string;
    url: string;
    name: string;
    size: number;
    file: any;
}
// 素材包管理列表
export class MaterialListCollection {
    id: string;
    name: string;
    submit_tm: number;
    verify_status: string;
    refuse_reason: string;
    submit_tm_tr: string;
    type: string;
}
