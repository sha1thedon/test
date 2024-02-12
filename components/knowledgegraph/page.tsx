// pages/knowledgeGraph.tsx
// pages/knowledgeGraph.tsx
import { useEffect, useState } from 'react';
import { Driver } from 'neo4j-driver';
import Head from 'next/head';
import Graph from 'react-graph-vis';

// interface Node {
//   id: string;
//   label: string;
// }

// interface Edge {
//   from: string;
//   to: string;
//   label: string;
// }

// interface GraphData {
//   nodes: Node[];
//   edges: Edge[];
// }

// interface KnowledgeGraphPageProps {
//   graphData: GraphData;
// }




interface GraphProps {
    nodes: any[];
    edges: any[];
}

const GraphComponent: React.FC<GraphProps> = ({ nodes, edges }) => {
    const graph = { nodes, edges };
  
    const options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: '#000000',
      },
    };
  
    
    return (
        <div> <Graph graph={graph} options={options} /></div>
    
    )



};

  
export default GraphComponent;




// const KnowledgeGraph: React.FC<KnowledgeGraphPageProps> = ({ graphData }) => {
//   const [knowledgeGraph, setKnowledgeGraph] = useState(graphData);

//   useEffect(() => {
//     // For the sake of simplicity, let's use dummy data for now
//     const dummyGraphData: GraphData = {
//       nodes: [
//         { id: '1', label: 'Topic 1' },
//         { id: '2', label: 'Topic 2' },
//         { id: '3', label: 'Topic 3' },
//       ],
//       edges: [
//         { from: '1', to: '2', label: 'Subtopic 1' },
//         { from: '1', to: '3', label: 'Subtopic 2' },
//       ],
//     };

//     setKnowledgeGraph(dummyGraphData);
//   }, []);

//   const options = {
//     layout: {
//       hierarchical: false,
//     },
//     edges: {
//       color: '#000000',
//     },
//   };

//   return (
//     <div>
//       <Head>
//         <title>Knowledge Graph</title>
//         <meta name="description" content="Knowledge Graph" />
//       </Head>

//       <h1>Knowledge Graph</h1>

//       <Graph graph={knowledgeGraph} options={options} style={{ height: '500px' }} />
//     </div>
//   );
// };




// // export async function getStaticProps() {
// //   // Connect to Neo4j Aura and fetch initial graph data
 
// //   const driver = neo4j.driver(
// //     process.env.NEO4J_URI || 'bolt://localhost:7687',
// //     neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password')
// //   );

// //   const session = driver.session();
// //   // Fetch initial data from the database
// //   // For simplicity, we'll use static data for now
// //   const graphData = {
// //     nodes: [],
// //     links: [],
// //   };

// //   session.close();
// //   driver.close();

// //   return {
// //     props: {
// //       graphData,
// //     },
// //   };
// // }

// export default KnowledgeGraph;


























// KnowledgeGraph.tsx
// import { useState } from 'react';
// import { Network, data } from 'vis-network';
// import axios from 'axios';
// import nlp from 'compromise';
// import { createGraphFromText } from '@/app/api/knowledgegraph/route';

// interface GraphData {
//     nodes: any[]; // Adjust the type based on your actual node structure
//     edges: any[]; // Adjust the type based on your actual edge structure
//   }

//   interface MyComponentProps {
//     data: GraphData;
//   }

// const KnowledgeGraph: React.FC = () => {
//     const graphData = {
//         nodes: [{ id: 1, label: 'Node 1' }, { id: 2, label: 'Node 2' }],
//         edges: [{ from: 1, to: 2 }],
//       };
//       const options = {
//         layout: {
//           hierarchical: true,
//         },
//         edges: {
//           color: 'red',
//         },
//       };

//   const [textInput, setTextInput] = useState<string>('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTextInput(e.target.value);
//   };

//   const handleGenerateGraph = async () => {
//     try {
//       // Use the 'compromise' library for basic NLP processing
//       const nlpResult = nlp(textInput);

//       // Extract nouns as nodes for the graph
//       const nodes = nlpResult
//         .nouns()
//         .out('array')
//         .map((noun: any, index: number) => ({ id: index + 1, label: noun }));

//       // Create edges between consecutive nodes
//       const edges = nodes
//         .map((node: any, index: number) => (index > 0 ? { from: index, to: index + 1 } : null))
//         .filter((edge: null) => edge !== null);

//       // Create a graph in Neo4j based on the NLP output
//       await createGraphFromText(textInput);

//       // Refresh or fetch the graph data from Neo4j to display
//       // For simplicity, we won't fetch the graph data in this example.
//     } catch (error) {
//       console.error('Error generating graph:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={textInput} onChange={handleInputChange} />
//       <button onClick={handleGenerateGraph}>Generate Knowledge Graph</button>
//       {/* Display the graph using vis-network */}
//       <div style={{ height: '500px' }}>
//         {/* <Network options={{}} data={{ nodes: [], edges: [] }} /> */}
//         {/* <Network data={graphData} options={options} /> */}
//       </div>
//     </div>
//   );
// };

// export default KnowledgeGraph;
