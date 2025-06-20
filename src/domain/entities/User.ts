export class User {
    constructor(
        public readonly id: string, 
        public firstName: string, 
        public lastName: string, 
        public email: string, 
        public password:string,
        public phone: string,
        public termsAgreed: boolean,
        public receiveEmails: boolean,
        
    ) {
        if(!this.isValidEmail(email)) {
            throw new Error("Invalid email format");
        }

        if(!this.isValidPhone(phone)) {
            throw new Error("Invalid phone number format");
        }

        if(!termsAgreed){
            throw new Error("User must agree to terms")
        }
    }

    private isValidEmail(email:string):boolean {
       return /\S+@\S+\.\S+/.test(email);
    }

    private isValidPhone(phone: string): boolean {
       return /^\+?[0-9]{7,15}$/.test(phone); // supports international format
    }
}