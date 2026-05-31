const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const app=express()
app.use(express.json())

let users=[]
const SECRET='mysecretkey123'
app.post('/register',async(req,res)=>{
    const {username,password}=req.body
    const exists=users.find(u=>u.username===username)
    if (exists) return res.status(400).json({message:'user exists'})
    const hashed=await bcrypt.hash(password,10)
    users.push({id:Date.now(),username,password:hashed})
    res.json({message:'login successful'})
})
app.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=users.find(u=>u.username===username)
    if(!user) return res.status(400).json({message:'user no exsist'})
    const valid=await bcrypt.compare(password,user.password)
    if (!valid) return res.status(400).json({message:'password mistake'})
    const token=jwt.sign(
        {id:user.id,username:user.username},
        SECRET,
        {expiresIn:'1d'}
    )
    res.json({message:'successful',token})
})
function authMiddleware(req,res,next){
    const token=req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(401).json({message:'no token,please login'})
    try{
    const decoded=jwt.verify(token,SECRET)
    req.user=decoded
    next()
    }catch(err){
    console.log('token mistake',err.message)
    res.status(401).json({message:'token no result'})
    }
}
app.get('/profile',authMiddleware,(req,res)=>{
    res.json({message:'its my personal information',user:req.user})
})
app.listen(3000,()=>{
    console.log('suth server running')
})