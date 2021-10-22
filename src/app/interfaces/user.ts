export interface IUser {
    nombre:string;
    email:string;
    password:string;
    terminos:boolean;
}

export interface IResUser {
    email:string;
    google:boolean;
    nombre:string;
    role:string;
    uid:string;
}

export interface ILogin {
    email:string;
    password:string;
    remember:boolean;
}

export interface IToken {
    token:string;
}
