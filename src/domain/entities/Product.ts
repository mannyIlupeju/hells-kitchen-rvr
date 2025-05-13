export class Product {
    constructor(
        public readonly id:string,
        public name: string,
        public price: number,
        public description: string,
        public inventoryCount: number, 
        public images: string[] = [],
        public sku?: string,
        public variants?: string
    ) {
        if(price < 0){
            throw new Error("Price cannot be negative");
        }

        if (inventoryCount < 0) {
             throw new Error("Inventory count cannot be negative");
        } 
      }
        
        isInStock():boolean {
            return this.inventoryCount > 0;
        }

        reduceInventory(quantity: number): void {
            if (quantity > this.inventoryCount) {
            throw new Error("Not enough inventory");
            }
            this.inventoryCount -= quantity;
        }
}