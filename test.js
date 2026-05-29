fetch('http://localhost:3000/users',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name:'wangwu',age:19})
})
.then(res=>res.json())
.then(data=>console.log('server return:',data))