export interface INewsLetterService{
 subscribeUser(email:string, name:string):Promise<void>;
 unubscribeUser(email: string):Promise<void>;
 sendBroadcast(subject:string, content:string):Promise<void>
 
}