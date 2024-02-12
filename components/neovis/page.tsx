// NeoVisComponent.tsx

import React, { useEffect } from 'react';
import NeoVis, { NeovisConfig } from 'neovis.js';

const NeoVisComponent: React.FC = () => {
    useEffect(() => {
        const draw = () => {
            const config: NeovisConfig = {
                containerId: "viz",
                // @ts-ignore
                serverUrl: "neo4j+s://3c2ec0e6.databases.neo4j.io",
                serverUser: 'neo4j',
                serverPassword: 'xkpb_N7Gb_TKEgjOU8W3np4vk8wblNYLDhGxMr9spwk',
                labels: {},
                relationships: {},
                initialCypher: "MATCH (n) RETURN n"
            };

            const viz = new NeoVis(config);
            viz.render();
        };

        draw();
    }, []);

    return <div id="viz"></div>;
};

export default NeoVisComponent;
