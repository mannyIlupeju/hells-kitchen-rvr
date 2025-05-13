import { Product } from "./Product";

export class CartItem {
    constructor (
        public readonly product: Product,
        public quantity: number = 1
    ){
        if(quantity < 1){
            throw new Error("Quantity must be at least 1");
        }
    }

    getTotal(): number {
        return this.product.price * this.quantity
    }
}

export class Cart {
    private items: Map<string, CartItem> = new Map();

    constructor(public readonly userId: string){}

    //adding product to the cart
    addProduct(product: Product, quantity: number = 1): void {
        const existing = this.items.get(product.id);
        if(existing) {
            existing.quantity += quantity; 
        } else {
            this.items.set(product.id, new CartItem(product, quantity));
        }
    }

    //removing product from the cart
    removeProduct(productId: string): void {
        this.items.delete(productId);
    }

    //updating quantity in the cart
    updateQuantity(productId:string, quantity:number):void {
        const item = this.items.get(productId)
        if(!item) throw new Error("Product not in cart");
        if(quantity <= 0){
            this.items.delete(productId);
        } else {
            item.quantity = quantity;
        }
    }

    getItems(): CartItem[] {
        return Array.from(this.items.values());
    }

    getTotal(): number {
        return this.getItems().reduce((sum, item) => sum + item.getTotal(), 0);
    }

    clear(): void{
        this.items.clear();
    }

}