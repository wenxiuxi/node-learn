const express=require('express')
const app=express()
app.use(express.json())

let tasks=[
    {id:1,title:'learn node.js',completed:false},
    {id:2,title:'learn express',completed:false},
]
app.get('/tasks',(req,res)=>{
    res.json(tasks)
})
app.get('/tasks/:id',(req,res)=>{
    const task=tasks.find(t=>t.id===Number(req.params.id))
    if (!task) return res.status(404).json({message:'task dosenot exsit'})
    res.json(task)
})
app.post('/tasks',(req,res)=>{
    const newTask={
        id:Date.now(),
        title:req.body.title,
        completed:false,
    }
    tasks.push(newTask)
    res.json({message:'create success',data:newTask})
})
app.put('/tasks/:id',(req,res)=>{
    const idx=tasks.findIndex(t=>t.id===Number(req.params.id))
    if (idx===-1) return res.status(404).json({message:'task donot exsit'})
    tasks[idx]={...tasks[idx],...req.body}
    res.json({message:'exid successful',data:tasks[idx]})
})
app.delete('/tasks/:id',(req,res)=>{
    tasks=tasks.filter(t=>t.id!==Number(req.params.id))
    res.json({message:'delete successful'})
})
app.listen(3000,()=>{
    console.log('restful api running')
})