import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/register',async (req, res)=>{
    
    const { username, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)

    // console.log(username, hashedPassword);
    
    try {
        const user = await prisma.User.create({
            data: {
                username,
                password: hashedPassword,
            }
        })

        // todo
        const defaultTodo = `Hello : Add Your first todo!`
        
        prisma.Todo.create({
            data: {
                task: defaultTodo,
                userId: user.id,
            }
        })


        const token = jwt.sign(
            {id: user.id },
            process.env.JWT_SECRET, 
            { expiresIn: '24h'}
        )
        res.json({ token })

        console.log('Register Done');

        // res.sendStatus(201)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(503)   
    }
    
})

router.post('/login', async (req, res)=>{
    const { username, password } = req.body

    try {
        const user = prisma.User.findUnique({
            where:{
                username: username
            }
        })
        
        if(!user) {
            return res.sendStatus(404).send({Message: 'User not found.'})
        }
        
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if(!passwordIsValid) {
            return res.sendStatus(401).send({message:"Incorrect password entered!"})
        }

        const token = jwt.sign(
            {id: user.id },
            process.env.JWT_SECRET, 
            { expiresIn: '24h'}
        )
        res.json({ token })

        console.log("Logged In")
        console.log(username, user.password)
        console.log({token})

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503)   
    }
    
})


export default router