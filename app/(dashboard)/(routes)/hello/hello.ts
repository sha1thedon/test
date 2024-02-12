import type { NextApiRequest, NextApiResponse } from 'next';

export default function hello() {


    const handleClick = async () => {
        const  response = await fetch("/api/hello", {
          method: "GET",
          body: JSON.stringify({ content: prompt }),
        });
        const data = await response.json();
        
    };

    

    
}

