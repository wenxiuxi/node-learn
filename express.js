const express=require('express')
const app=express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('this is home')
})
app.get('/users',(req,res)=>{
    res.json([
        {id:1,name:'lily'},
        {id:2,name:'wen'},
    ])
})
app.get('/users/:id',(req,res)=>{
    const id=req.params.id
    res.json({id:id,name:'lily'})
})
app.post('/users',(req,res)=>{
    const body=req.body
    console.log('noted data',body)
    res.json({message:'create success',data:body})
})
app.listen(3000,()=>{
    console.log('express server is running')
})