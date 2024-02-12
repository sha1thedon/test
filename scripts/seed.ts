const { PrismaClient } = require ("@prisma/client")

const database = new PrismaClient()

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Maths and Logic"},
                { name: "Artificial Intelligence"},
                { name: "DSA"}
            ]
        })

    console.log("Success")

    } catch (error
    ){
        console.log('error', error)
    } finally {
        await database.$disconnect()
    }
}

main()