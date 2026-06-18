const base='http://localhost:3000'
async function test() {
    //create tasks
    const created=await fetch(`${base}/api/tasks`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({title:'test taskhub联调'})
    }).then(r=>r.json())
    console.log('create',created)

    //get all tasks
    const all=await fetch(`${base}/api/tasks`).then(r=>r.json())
    console.log('all task',all)
}
test()