export class Customer {
    constructor(
        public readonly id: string, 
        public name: string, 
        public email: string, 
        public address: string,
        public phone: string
    ) {
        if(!this.isValidEmail(email)) {
            throw new Error("Invalid email format");
        }

        if(!this.isValidEmail(phone)) {
            throw new Error("Invalid phone number format");
        }
    }

    private isValidEmail(email:string):boolean {
       return /\S+@\S+\.\S+/.test(email);
    }

    private isValidPhone(phone: string): boolean {
       return /^\+?[0-9]{7,15}$/.test(phone); // supports international format
    }
}