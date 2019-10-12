export class User {
    constructor(public user_id: number,
        public user_email: string,
        public user_name: string,
        public user_company_name: string,
        public user_contact: string,
        public user_password: string,
        public user_otp: string,
        public otp_timestamp: string,
        public IsVerified: number) { }
}