export class User_Class {
    constructor(public user_email: string,
        public user_password: string,
        public user_name: string,
        public user_company_name: string,
        public user_contact: string
    ) {

    }
}

export class UserEdit {
    constructor(
        public user_email: string,
        public user_name: string,
        public user_company_name: string,
        public user_contact: string
    ) {




    }
}