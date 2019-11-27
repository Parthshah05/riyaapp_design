export class Cart_Class {
    constructor(
        public product_id: string,
        public product_name: string,
        public product_desc: string,
        public fk_cat_id: string,
        public cat_name: string,
        public product_qty: string
    ) {

    }
}
export class Cart_Update_Class {
    constructor(
        public user_id:string,
        public product_id:string,
        public product_qty:string
    ) {

    }
}