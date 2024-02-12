// TextProcessor.ts
import natural from 'natural';

interface GraphData {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
}

const processText = (text: string): GraphData => {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text);

  // Count word frequency
const wordFrequency: Record<string, number> = {};
(words as string[]).forEach((word) => {
    const normalizedWord = word.toLowerCase();
    if (wordFrequency[normalizedWord]) {
        wordFrequency[normalizedWord]++;
    } else {
        wordFrequency[normalizedWord] = 1;
    }
});

// Create nodes and edges for the graph
const nodes = Object.keys(wordFrequency).map((word) => ({
    id: word,
    label: `${word} (${wordFrequency[word]})`,
}));

  const edges = Object.keys(wordFrequency).map((word) => ({
    from: word,
    to: 'root',
  }));

  return {
    nodes: [...nodes, { id: 'root', label: 'Text' }],
    edges,
  };
};

export default processText;
