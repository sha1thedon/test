// server.ts
// server.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ManagedTransaction, Record} from 'neo4j-driver';
import neo4j from 'neo4j-driver';
 // import { Record } from 'neo4j-driver';
interface Params {
    [key: string]: number | string; // Adjust the types based on your specific schema
  }


const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password')
);

const session = driver.session();

export default session;

export const createGraphFromText = async (text: string) => {
    const session = driver.session();
  
   

    try {
        const result = await session.run(
            'CREATE (a:Person {name: $name}) RETURN a',
            { name: 'Arthur' }
        );
    
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
    
        console.log(node.properties.name);
        await driver.close();
        // should be 'Arthur'
    }
    finally {
        await session.close();
    }
    //   const words = text.split(' ');
  
    //   const createNodesQuery = words.map((word, index) => `CREATE (:Word {id: $id${index}, label: $label${index}})`).join(' ');
    //   const createEdgesQuery = words
    //     .map((word, index) => (index > 0 ? `CREATE (:Word)-[:CONNECTED]->(:Word)` : ''))
    //     .filter((query) => query !== '')
    //     .join(' ');
  
    //   const params: Record<string, any> = words.reduce((acc, word, index) => {
    //     acc[`id${index}` as keyof Params] = index + 1;
    //     acc[`label${index}` as keyof Params] = word;
    //     return acc;
    //   }, {} as Params);
  
    //   await session.run(`${createNodesQuery} ${createEdgesQuery}`, params);
    // } finally {
    //   await session.close();
    // }
}

// export default driver;

// const runCypherQuery = async (query: string, params?: Record<string, any>) => {
//   const session = driver.session();
//   try {
//     const result = await session.run(query, params);
//     return result.records.map((record) => record.toObject());
//   } finally {
//     await session.close();
//   }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const nodesQuery = 'MATCH (n) RETURN n';
//       const relationshipsQuery = 'MATCH (a)-[r]->(b) RETURN r';

//       const nodesResult = await runCypherQuery(nodesQuery);
//       const relationshipsResult = await runCypherQuery(relationshipsQuery);

//       const nodes = nodesResult.map((record: any) => ({
//         id: record.n.identity.toString(),
//         label: record.n.labels[0], // Assuming the node has only one label
//       }));

//       const links = relationshipsResult.map((record: any) => ({
//         source: record.r.start.toString(),
//         target: record.r.end.toString(),
//       }));

//       res.status(200).json({ nodes, links });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
