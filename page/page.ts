

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStaticProps() {
    if (!prisma) {
        throw new Error('Prisma client is not available');
    }

    const notes = await prisma.note.findMany();
    return {
        props: {
            notes,
        },
    };}

    