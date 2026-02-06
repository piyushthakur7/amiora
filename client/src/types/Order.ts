export interface Order {
    id: number;
    status: string;
    total: string;
    currency: string;
    date_created: string;
    payment_method: string;
    payment_method_title: string;
    line_items: Array<{
        id: number;
        name: string;
        product_id: number;
        quantity: number;
        total: string;
    }>;
    billing: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address_1: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
}
