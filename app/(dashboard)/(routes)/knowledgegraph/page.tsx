"use client"
import Graph from "react-graph-vis";
import React, { useState, useEffect, useRef } from "react";
// import KnowledgeGraph from "@/components/knowledgegraph/page";
// import driver from "@/app/api/knowledgegraph/route";
import neo4jDriver from "neo4j-driver";
import axios from 'axios';
import * as d3 from 'd3';
import Neovis from 'neovis.js';
// import session from "@/app/api/knowledgegraph/route";
import neo4j from 'neo4j-driver';
import GraphComponent from "@/components/knowledgegraph/page";
import NeoVisComponent from "@/components/neovis/page";

const uri = 'neo4j+s://3c2ec0e6.databases.neo4j.io';
const user = 'neo4j';
const password = 'xkpb_N7Gb_TKEgjOU8W3np4vk8wblNYLDhGxMr9spwk';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();


const DEFAULT_PARAMS = {
  "model": "text-davinci-003",
  "temperature": 0.3,
  "max_tokens": 800,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}

const SELECTED_PROMPT = "STATELESS"

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#34495e"
  }
};

const KnowledgeGraphPage: React.FC =  () => {

  const [data, setData] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await session.run('MATCH (n) RETURN n');
      setData(result.records.map(record => record.get('n').properties));
    };

    fetchData();
  }, []);

    const nodes = data.map(node => ({ id: node.id, label: node.name }));
  const edges = data.map(node => ({
    from: node.id,
    to: node.city ? node.city.id : undefined,
  }));

  return (
    <div>
      <h1>Knowledge Graph</h1>
      <NeoVisComponent />
      {/* <GraphComponent nodes={nodes} edges={edges} /> */}
      <ul>
        {data.map((node, index) => (
          <li key={index}>{JSON.stringify(node)}</li>
        ))}
      </ul>
    </div>
  )
        }


    export default KnowledgeGraphPage;


  // pages/index.tsx


//   const [graphState, setGraphState] = useState(
//     {
//       nodes: [],
//       edges: []
//     }
//   );  

//   const clearState = () => {
//     setGraphState({
//       nodes: [],
//       edges: []
//     })
//   };  

  
//   const updateGraph = (updates: any[]) => {
//     // updates will be provided as a list of lists
//     // each list will be of the form [ENTITY1, RELATION, ENTITY2] or [ENTITY1, COLOR]

//     var current_graph = JSON.parse(JSON.stringify(graphState));

//     if (updates.length === 0) {
//       return;
//     }

//     // check type of first element in updates
//     if (typeof updates[0] === "string") {
//       // updates is a list of strings
//       updates = [updates]
//     }

//     updates.forEach((update: string | any[]) => {
//       if (update.length === 3) {
//         // update the current graph with a new relation
//         const [entity1, relation, entity2] = update as string[];

//         // check if the nodes already exist
//         var node1 = current_graph.nodes.find((node: any) => node.id === entity1);
//         var node2 = current_graph.nodes.find((node: any) => node.id === entity2);

//         if (node1 === undefined) {
//             current_graph.nodes.push({ id: entity1, label: entity1, color: "#ffffff" });
//         }

//         if (node2 === undefined) {
//             current_graph.nodes.push({ id: entity2, label: entity2, color: "#ffffff" });
//         }

//         // check if an edge between the two nodes already exists and if so, update the label
//         var edge = current_graph.edges.find((edge: { from: string; to: string; }) => edge.from === entity1 && edge.to === entity2);
//         if (edge !== undefined) {
//           edge.label = relation;
//           return;
//         }

//         current_graph.edges.push({ from: entity1, to: entity2, label: relation });

//       } else if (update.length === 2 && update[1].startsWith("#")) {
//         // update the current graph with a new color
//         const updateGraph = (updates: any[]) => {
//             // ...existing code...

//             updates.forEach((update: string | [string, string]) => {
//                 if (update.length === 3) {
//                     // ...existing code...
//                 } else if (update.length === 2 && typeof update[1] === "string" && update[1].startsWith("#")) {
//                     // update the current graph with a new color
//                     const [entity, color] = update as [string, string];
//                 }});};};});};

//   const queryStatelessPrompt = (prompt: string, apiKey: any) => {
//     fetch('prompts/stateless.prompt')
//       .then(response => response.text())
//       .then(text => text.replace("$prompt", prompt))
//       .then(prompt => {
//         console.log(prompt)

//         const params = { ...DEFAULT_PARAMS, prompt: prompt, stop: "\n" };

//         const requestOptions = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + String(apiKey)
//           },
//           body: JSON.stringify(params)
//         };
//         fetch('https://api.openai.com/v1/completions', requestOptions)
//           .then(response => {
//             if (!response.ok) {
//               switch (response.status) {
//                 case 401: // 401: Unauthorized: API key is wrong
//                   throw new Error('Please double-check your API key.');
//                 case 429: // 429: Too Many Requests: Need to pay
//                   throw new Error('You exceeded your current quota, please check your plan and billing details.');
//                 default:
//                   throw new Error('Something went wrong with the request, please check the Network log');
//               }
//             }
//             return response.json();
//           })
//         .then((response) => {
//             const { choices } = response;
//             const text = choices[0].text;
//             console.log(text);

//             const updates = JSON.parse(text);
//             console.log(updates);

//             updateGraph(updates);

//             const searchBar = document.getElementsByClassName("searchBar")[0] as HTMLInputElement;
//             searchBar.value = "";
//             document.body.style.cursor = 'default';
//             (document.getElementsByClassName("generateButton")[0] as HTMLInputElement).disabled = false;
//         }).catch((error) => {
//             console.log(error);
//             alert(error);
//           });
//       })
//   }

//   const queryStatefulPrompt = (prompt: string, apiKey: any) => {
//     fetch('prompts/stateful.prompt')
//       .then(response => response.text())
//       .then(text => text.replace("$prompt", prompt))
//       .then(text => text.replace("$state", JSON.stringify(graphState)))
//       .then(prompt => {
//         console.log(prompt)

//         const params = { ...DEFAULT_PARAMS, prompt: prompt };

//         const requestOptions = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + String(apiKey)
//           },
//           body: JSON.stringify(params)
//         };
//         fetch('https://api.openai.com/v1/completions', requestOptions)
//           .then(response => {
//             if (!response.ok) {
//               switch (response.status) {
//                 case 401: // 401: Unauthorized: API key is wrong
//                   throw new Error('Please double-check your API key.');
//                 case 429: // 429: Too Many Requests: Need to pay
//                   throw new Error('You exceeded your current quota, please check your plan and billing details.');
//                 default:
//                   throw new Error('Something went wrong with the request, please check the Network log');
//               }
//             }
//             return response.json();
//           })
//         .then((response) => {
//             const { choices } = response;
//             const text = choices[0].text;
//             console.log(text);

//             const new_graph = JSON.parse(text);

//             setGraphState(new_graph);

//             const searchBar = document.getElementsByClassName("searchBar")[0] as HTMLInputElement;
//             searchBar.value = "";
//             document.body.style.cursor = 'default';
//             (document.getElementsByClassName("generateButton")[0] as HTMLInputElement).disabled = false;
//         }).catch((error) => {
//             console.log(error);
//             alert(error);
//           });
//       })
//   };

// const queryPrompt = (prompt: string, apiKey: any) => {
//     if (SELECTED_PROMPT === "STATELESS") {
//         queryStatelessPrompt(prompt, apiKey);
//     } else if (SELECTED_PROMPT === "STATEFUL") {
//         queryStatefulPrompt(prompt, apiKey);
//     } else {
//         alert("Please select a prompt");
//         document.body.style.cursor = 'default';
//         (document.getElementsByClassName("generateButton")[0] as HTMLInputElement).disabled = false;
//     }

// }

// const createGraph = () => {
//     document.body.style.cursor = 'wait';

//     const generateButton = document.getElementsByClassName("generateButton")[0] as HTMLInputElement;
//     generateButton.disabled = true;

//     const prompt = document.getElementsByClassName("searchBar")[0] as HTMLInputElement;
//     const apiKey = document.getElementsByClassName("apiKeyTextField")[0] as HTMLInputElement;

//     queryPrompt(prompt.value, apiKey.value);
// }

  
    // <div className='container'>
    //   <h1 className="headerText">GraphGPT 🔎</h1>
    //   <p className='subheaderText'>Build complex, directed graphs to add structure to your ideas using natural language. Understand the relationships between people, systems, and maybe solve a mystery.</p>
    //   <p className='opensourceText'><a href="" target="_blank">GraphGPT is open-source</a>&nbsp;🎉</p>
    //   <center>
    //     <div className='inputContainer'>
    //       <input className="searchBar" placeholder="Describe your graph..."></input>
    //       <input className="apiKeyTextField" type="password" placeholder="Enter your OpenAI API key..."></input>
    //       <button className="generateButton" onClick={createGraph}>Generate</button>
    //       <button className="clearButton" onClick={clearState}>Clear</button>
    //     </div>
    //   </center>
    //   </div>
   




//   const [graphState, setGraphState] = useState(
//     {
//       nodes: [],
//       edges: []
//     }
//   );

//   const clearState = () => {
//     setGraphState({
//       nodes: [],
//       edges: []
//     })
//   };

//   const updateGraph = (updates: any[]) => {
//     // updates will be provided as a list of lists
//     // each list will be of the form [ENTITY1, RELATION, ENTITY2] or [ENTITY1, COLOR]

//     var current_graph = JSON.parse(JSON.stringify(graphState));

//     if (updates.length === 0) {
//       return;
//     }

//     // check type of first element in updates
//     if (typeof updates[0] === "string") {
//       // updates is a list of strings
//       updates = [updates]
//     }

//     updates.forEach((update: string | any[]) => {
//       if (update.length === 3) {
//         // update the current graph with a new relation
//         const [entity1, relation, entity2] = update as string[];

//         // check if the nodes already exist
//         var node1 = current_graph.nodes.find((node: any) => node.id === entity1);
//         var node2 = current_graph.nodes.find((node: any) => node.id === entity2);

//         if (node1 === undefined) {
//             current_graph.nodes.push({ id: entity1, label: entity1, color: "#ffffff" });
//         }

//         if (node2 === undefined) {
//             current_graph.nodes.push({ id: entity2, label: entity2, color: "#ffffff" });
//         }

//         // check if an edge between the two nodes already exists and if so, update the label
//         var edge = current_graph.edges.find((edge: { from: string; to: string; }) => edge.from === entity1 && edge.to === entity2);
//         if (edge !== undefined) {
//           edge.label = relation;
//           return;
//         }

//         current_graph.edges.push({ from: entity1, to: entity2, label: relation });

//       } else if (update.length === 2 && update[1].startsWith("#")) {
//         // update the current graph with a new color
//         const updateGraph = (updates: any[]) => {
//             // ...existing code...

//             updates.forEach((update: string | [string, string]) => {
//                 if (update.length === 3) {
//                     // ...existing code...
//                 } else if (update.length === 2 && typeof update[1] === "string" && update[1].startsWith("#")) {
//                     // update the current graph with a new color
//                     const [entity, color] = update as [string, string];

//                     // check if the node already exists
//                     var node = current_graph.nodes.find((node: any) => node.id === entity);

//                     if (node === undefined) {
//                         current_graph.nodes.push({ id: entity, label: entity, color: color });
//                         return;
//                     }

//                     // update the color of the node
//                     node.color = color;
//                 }
//             });

//             // ...existing code...
//         };


//       } else if (update.length === 2 && update[0] == "DELETE") {
//         // delete the node at the given index
//         const [_, index] = update as [string, string];

//         // check if the node already exists
//         var node = current_graph.nodes.find((node: any) => node.id === index);

//         if (node === undefined) {
//             return;
//         }

//         // delete the node
//         current_graph.nodes = current_graph.nodes.filter((node: any) => node.id !== index);

//         // delete all edges that contain the node
//         current_graph.edges = current_graph.edges.filter((edge: any) => edge.from !== index && edge.to !== index);
//       }
//     });
//     setGraphState(current_graph);
//   };

//   const queryStatelessPrompt = (prompt: string, apiKey: any) => {
//     fetch('prompts/stateless.prompt')
//       .then(response => response.text())
//       .then(text => text.replace("$prompt", prompt))
//       .then(prompt => {
//         console.log(prompt)

//         const params = { ...DEFAULT_PARAMS, prompt: prompt, stop: "\n" };

//         const requestOptions = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + String(apiKey)
//           },
//           body: JSON.stringify(params)
//         };
//         fetch('https://api.openai.com/v1/completions', requestOptions)
//           .then(response => {
//             if (!response.ok) {
//               switch (response.status) {
//                 case 401: // 401: Unauthorized: API key is wrong
//                   throw new Error('Please double-check your API key.');
//                 case 429: // 429: Too Many Requests: Need to pay
//                   throw new Error('You exceeded your current quota, please check your plan and billing details.');
//                 default:
//                   throw new Error('Something went wrong with the request, please check the Network log');
//               }
//             }
//             return response.json();
//           })
//         .then((response) => {
//             const { choices } = response;
//             const text = choices[0].text;
//             console.log(text);

//             const updates = JSON.parse(text);
//             console.log(updates);

//             updateGraph(updates);

//             const searchBar = document.getElementsByClassName("searchBar")[0] as HTMLInputElement;
//             searchBar.value = "";
//             document.body.style.cursor = 'default';
//             (document.getElementsByClassName("generateButton")[0] as HTMLInputElement).disabled = false;
//         }).catch((error) => {
//             console.log(error);
//             alert(error);
//           });
//       })
//   };

//   const queryStatefulPrompt = (prompt: string, apiKey: any) => {
//     fetch('prompts/stateful.prompt')
//       .then(response => response.text())
//       .then(text => text.replace("$prompt", prompt))
//       .then(text => text.replace("$state", JSON.stringify(graphState)))
//       .then(prompt => {
//         console.log(prompt)

//         const params = { ...DEFAULT_PARAMS, prompt: prompt };

//         const requestOptions = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + String(apiKey)
//           },
//           body: JSON.stringify(params)
//         };
//         fetch('https://api.openai.com/v1/completions', requestOptions)
//           .then(response => {
//             if (!response.ok) {
//               switch (response.status) {
//                 case 401: // 401: Unauthorized: API key is wrong
//                   throw new Error('Please double-check your API key.');
//                 case 429: // 429: Too Many Requests: Need to pay
//                   throw new Error('You exceeded your current quota, please check your plan and billing details.');
//                 default:
//                   throw new Error('Something went wrong with the request, please check the Network log');
//               }
//             }
//             return response.json();
//           })
//         .then((response) => {
//             const { choices } = response;
//             const text = choices[0].text;
//             console.log(text);

//             const new_graph = JSON.parse(text);

//             setGraphState(new_graph);

//             const searchBar = document.getElementsByClassName("searchBar")[0] as HTMLInputElement;
//             searchBar.value = "";
//             document.body.style.cursor = 'default';
//             (document.getElementsByClassName("generateButton")[0] as HTMLInputElement).disabled = false;
//         }).catch((error) => {
//             console.log(error);
//             alert(error);
//           });
//       })
//   };

// const queryPrompt = (prompt: string, apiKey: any) => {
//     if (SELECTED_PROMPT === "STATELESS") {
//         queryStatelessPrompt(prompt, apiKey);
//     } else if (SELECTED_PROMPT === "STATEFUL") {
//         queryStatefulPrompt(prompt, apiKey);
//     } else {
//         alert("Please select a prompt");
//         document.body.style.cursor = 'default';
//         (document.getElementsByClassName("generateButton")[0] as HTMLInputElement).disabled = false;
//     }
// }


// const createGraph = () => {
//     document.body.style.cursor = 'wait';

//     const generateButton = document.getElementsByClassName("generateButton")[0] as HTMLInputElement;
//     generateButton.disabled = true;

//     const prompt = document.getElementsByClassName("searchBar")[0] as HTMLInputElement;
//     const apiKey = document.getElementsByClassName("apiKeyTextField")[0] as HTMLInputElement;

//     queryPrompt(prompt.value, apiKey.value);
// }

//   return (
//     <div className='container'>
//       <h1 className="headerText">GraphGPT 🔎</h1>
//       <p className='subheaderText'>Build complex, directed graphs to add structure to your ideas using natural language. Understand the relationships between people, systems, and maybe solve a mystery.</p>
//       <p className='opensourceText'><a href="https://github.com/varunshenoy/graphgpt">GraphGPT is open-source</a>&nbsp;🎉</p>
//       <center>
//         <div className='inputContainer'>
//           <input className="searchBar" placeholder="Describe your graph..."></input>
//           <input className="apiKeyTextField" type="password" placeholder="Enter your OpenAI API key..."></input>
//           <button className="generateButton" onClick={createGraph}>Generate</button>
//           <button className="clearButton" onClick={clearState}>Clear</button>
//         </div>
//       </center>
//       <div className='graphContainer'>
//         <Graph graph={graphState} options={options} style={{ height: "640px" }} />
//       </div>
//       <p className='footer'>Pro tip: don't take a screenshot! You can right-click and save the graph as a .png  📸</p>
//     </div>
//   );
// }

