const base='http://localhost:3000'
async function test(){
    const all=await fetch(`${base}/tasks`).then(r=>r.json())
    console.log('all tasks',all)

    const one=await fetch(`${base}/tasks/1`).then(r=>r.json())
    console.log('solo task',one)

    const created=await fetch(`${base}/tasks`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({title:'learn sql'})
    }).then(r=>r.json())
    console.log('create result',created)
    
    const updated=await fetch(`${base}/tasks/1`,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({completed:true})
    }).then(r=>r.json())
    console.log('modify result',updated)

    const deleted=await fetch(`${base}/tasks/2`,{
        method:'DELETE'
    }).then(r=>r.json())
    console.log('delete result',deleted)
}
test()