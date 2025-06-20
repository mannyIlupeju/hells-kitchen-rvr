import express from 'express';
import bcrypt from "bcryptjs";
import { FirebaseUserRepository } from '../../infrastructure/db/firebase/FirebaseUserRepository';
import { UserService } from '../../application/services/UserService';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const userService = new UserService(new FirebaseUserRepository());

router.post("/register", async(req,res)=> {
    try{
        const {id, firstName, lastName, password, email, phone, termsAgreed, receiveEmails} = req.body;

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await userService.registerUser({
            id: uuidv4(),
            firstName,
            lastName, 
            passwordHash, 
            email, 
            phone, 
            termsAgreed: termsAgreed === true || termsAgreed === 'true', 
            receiveEmails: receiveEmails === true || receiveEmails === 'true',
        });

        res.status(201).json(user);
        
    }catch(error){
        console.error(error);
        res.status(400).json({error: error.message})
    }
});



router.get("/:id", async(req, res)=> {
    const user = await userService.getUser(req.params.id);
    if(!user) return res.status(404).send("User not found");
    res.json(user);
});

export default router;