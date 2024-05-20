import { useState } from 'react';
import { trpc } from '../utils/trpc';

// Defining the ImageGenerator component
export function ImageGenerator() {
  // State for managing the prompt input by the user
  const [prompt, setPrompt] = useState('');
  
  // State for managing the generated image URL
  const [imageUrl, setImageUrl] = useState('');
  
  // State for managing error messages
  const [error, setError] = useState('');
  
  // State for managing the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Destructuring refetch function from the useQuery hook for fetching image data
  const { refetch } = trpc.openai.getImage.useQuery(prompt, {
    enabled: false // Disabling the query from running automatically
  });

  // Function to fetch image data based on the prompt
  const fetchData = async () => {
    if (prompt.trim() === '') { // Checking if the prompt is empty
      setError('Prompt cannot be empty'); // Setting error message
      setImageUrl(''); // Clearing the image URL state
      return;
    }

    setError(''); // Clearing any previous error messages
    setIsLoading(true); // Setting loading state to true

    try {
      const result = await refetch(); // Refetching the data using trpc
      if (result.data) { // Checking if data is received
        const { imageUrl } = result.data; // Destructuring imageUrl from the result data
        setImageUrl(imageUrl); // Setting the image URL state
      } else {
        setError('Error: No data received'); // Setting error message if no data is received
        setImageUrl(''); // Clearing the image URL state
      }
    } catch (error) {
      setError('Error fetching image'); // Setting error message if an exception occurs
      setImageUrl(''); // Clearing the image URL state
    } finally {
      setIsLoading(false); // Setting loading state to false
    }
  };

  // Return statement for rendering the component JSX
  return (
    <div className="max-w-md mx-auto">
      <div>Generate an image based on a prompt</div>
      <div className="flex flex-col items-stretch mt-2">
        {/* Input field for entering the prompt */}
        <input
          type="text"
          placeholder="Enter a prompt"
          className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={prompt} // Binding the prompt value to the state
          onChange={(e) => setPrompt(e.target.value)} // Updating the prompt state on change
        />
        <button
          onClick={fetchData} // Handling button click to fetch data
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>} {/* Displaying loading state */}
        {error && <p className="text-red-500">{error}</p>} {/* Displaying error message */}
        {imageUrl && ( // Checking if an image URL is available
          <div className="mt-4">
            {/* Displaying the generated image */}
            <img src={imageUrl} alt="Generated" className="w-full h-auto border border-gray-200 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
