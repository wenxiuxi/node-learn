const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
// expree 写接口的
// jwt生成令牌
// bcrypt加密密码
const app=express()
app.use(express.json())

//users假装数据库
let users=[]
//secret加密令牌用的密钥
const SECRET='mysecretkey123'

//注册接口
// 收到用户名密码 → 查重 → 加密密码 → 存起来 → 回复成功。
app.post('/register',async(req,res)=>{
    const {username,password}=req.body//拿到前端发来的用户名和密码
    const exists=users.find(u=>u.username===username)//查询这个用户
    if (exists) return res.status(400).json({message:'user exists'})//如果存在就拒绝
    const hashed=await bcrypt.hash(password,10)//把密码加密
    users.push({id:Date.now(),username,password:hashed})//存进数据库
    res.json({message:'login successful'})//告诉前端注册成功
})

//登录接口
app.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=users.find(u=>u.username===username)
    if(!user) return res.status(400).json({message:'user no exsist'})
    const valid=await bcrypt.compare(password,user.password)
    if (!valid) return res.status(400).json({message:'password mistake'})
   //下面这个很重要，这个令牌里面要存储的东西，这三个缺一不可。
        const token=jwt.sign(
        {id:user.id,username:user.username},//想存进token的数据
        SECRET,//密钥
        {expiresIn:'1d'}//过期时间
    )
    res.json({message:'successful',token})
})

//
function authMiddleware(req,res,next){
    //前端发请求时，会在请求头里带一个东西：
// Authorization: Bearer eyJhbGci...
    const token=req.headers.authorization?.split(' ')[1]//split(' ') 不是"展开"，是按空格切开字符串，变成数组：
    if(!token) return res.status(401).json({message:'no token,please login'})
    try{
        //sign 是生成token，
        // verify 是反过来——验证这个token是不是真的，没被篡改。
    const decoded=jwt.verify(token,SECRET)
    req.user=decoded
    next()//中间件，放行的函数，如果没有这个就一直卡在authmiddleware
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