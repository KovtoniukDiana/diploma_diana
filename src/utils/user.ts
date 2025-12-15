import prisma from './prisma';


export default async function getUserFromDB(email: string) {

    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}