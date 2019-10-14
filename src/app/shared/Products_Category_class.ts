export class Products_Category_Classs {
    constructor(public product_id: number,
        public product_name: string,
        public product_desc: string,
        public fk_cat_id: number,
        public cat_name: number,
        public qty: number) {
        /* this.qty = 1; */
    }
};
