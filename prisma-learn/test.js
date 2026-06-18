const base='http://localhost:3000'
async function test() {
    const users=await fetch(`${base}/users`).then(r=>r.json())
    console.log('all users:',users)
    
}
test