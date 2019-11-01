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