const base='http://localhost:3000'
//test create user
async function test(){
    const newUser=await fetch(`${base}/users`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        //json.stringify是对象转字符串。json.parse是字符串转对象。
        body:JSON.stringify({username:'testuser',password:'123456'})
    }).then(r=>r.json())//发完请求，然后把结果转成json
    console.log('create user',newUser)
    const users=await fetch(`${base}/users`).then(r=>r.json())
    console.log('all users',users)
}
test()