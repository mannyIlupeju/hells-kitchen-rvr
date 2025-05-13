
import { Product } from "./Product";

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export class Order{
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly products: Product[],
        public readonly createdAt: Date = new Date(),
        public status: OrderStatus = "pending"
    ){
        if(products.length === 0){
            throw new Error("order must include at least one product");
        }
    }

    getTotal():number {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }

    updateStatus(newStatus: OrderStatus):void {
        const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
            pending: ["paid", "cancelled"],
            paid: ["shipped", "cancelled"],
            shipped: [],
            cancelled: [],
        }

        if(!allowedTransitions[this.status].includes(newStatus)) {
            throw new Error(`Invalid status tranisiton from ${this.status} to ${newStatus}`);
        }

        this.status = newStatus;
    }

    isCancellable():boolean {
        return this.status === "pending" || this.status === "paid";
    }

}