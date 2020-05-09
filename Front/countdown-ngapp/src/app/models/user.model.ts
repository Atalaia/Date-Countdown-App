export class UserModel {
    _id?: string;
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    password: string = '';
    birthday: Date = new Date();
    createdAt: Date = new Date();
}
