import React, { useState } from 'react';
import { trpc } from './utils/trpc';

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = trpc.openai.getImage.useQuery(prompt, {
    enabled: false,
  });

  const fetchData = async () => {
    if (prompt.trim() === '') {
      setError('Prompt cannot be empty');
      setImageUrl('');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await refetch(); 
      if (result.data) { 
        const { imageUrl } = result.data 
        setImageUrl(imageUrl)
      } else {
        setError('Error: No data received');
        setImageUrl('');
      }
    } catch (error) {
      setError('Error fetching image');
      setImageUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>Generate an image based on a prompt</div>
      <div className="flex flex-col items-stretch mt-2">
        <input
          type="text"
          placeholder="Enter a prompt"
          className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="Generated" className="w-full h-auto border border-gray-200 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}

