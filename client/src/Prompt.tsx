import React, { useState } from 'react';
import { trpc } from './utils/trpc';

type Props = {
  type?: string;
  heading: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
};

export function PromptGenerator() {
  const [keyword, setKeyword] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const { refetch, isLoading } = trpc.openai.getPrompt.useQuery(keyword, {
    enabled: false,
  });

  const fetchData = async () => {
    if (keyword.trim() === '') {
      setError('Keyword cannot be empty');
      return;
    }

    if (keyword.length > 20) {
      setError('Keyword cannot be longer than 20 characters');
      return;
    }

    setError('');

    const result = await refetch();
    if(result.data?.prompt != undefined && result.data.prompt != null) {
      const promptt = result.data.prompt
      setPrompt(promptt) 
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>Generate a prompt based on a keyword/topic</div>
      <div className="flex flex-col items-stretch mt-2">
        <input
          type="text"
          placeholder="Enter a keyword"
          className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4 overflow-wrap break-word">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {prompt && <p className="p-2 border-b border-gray-200">{prompt}</p>}
      </div>
    </div>
  );
}

