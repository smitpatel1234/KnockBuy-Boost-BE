export interface AddDiscountModel {
    active_flag?: 0|1;
    description?: string;
    discount_amount: number;
    discount_code: string;
    discount_name: string;
    discount_start_date?: Date;
    discount_type: "flat" | "percentage";
    duration?: number;
}

export interface DiscountModel extends AddDiscountModel {
    discount_id: string;
}

export interface GetDiscountModel extends AddDiscountModel {
    discount_id: string;
}
