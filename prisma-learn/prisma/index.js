const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()
async function main(){
    //create users
    const user=await prisma.user.create({
        data:{
            username:'wenxiu2',
            password:'123456',
        }
    })
    console.log('创建用户',user)
    //create tasks
    const task=await prisma.task.create({
        data:{
            title:'learn prisma',
            userId:user.id,
        }
    })
    console.log('create task',task)
    //search include connect data
    const users=await prisma.user.findMany({
        include:{tasks:true}
    })
    console.log('ever users:',JSON.stringify(users,null,2))
}
main()


