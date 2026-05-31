const base='http://localhost:3000'
async function test(){
    const register=await fetch(`${base}/register`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username:'wenxiu',password:'123456'})
    }).then(r=>r.json())
    console.log('login result',register)
    const login=await fetch(`${base}/login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username:'wenxiu',password:'123456'})
    }).then(r=>r.json())
    console.log('result',login)

    const token=login.token
    const profile=await fetch(`${base}/profile`,{
        headers:{'Authorization':`Bearer ${token}`}
    }).then(r=>r.json())
    console.log('personal information',profile)
    const noToken=await fetch(`${base}/profile`).then(r=>r.json())
    console.log('no token result',noToken)
}
test()