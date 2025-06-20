export class NewsletterSubscriber {
    constructor (
        public readonly email:string,
        public readonly fullName:string,
        public termsAgreed: boolean,
        public readonly createdAt: Date = new Date()

    ) {
        if(!this.isValidEmail(email)){
            throw new Error("Invalid email format")
        }
    }

    private isValidEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
      }
}