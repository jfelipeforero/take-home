import { useState } from 'react';
import { trpc } from '../utils/trpc';

// Defining the PromptGenerator component
export function PromptGenerator() {
  // State for managing the keyword input by the user
  const [keyword, setKeyword] = useState('');
  
  // State for managing the generated prompt
  const [prompt, setPrompt] = useState('');
  
  // State for managing error messages
  const [error, setError] = useState('');

  // Destructuring refetch and isLoading from the useQuery hook for fetching prompt data
  const { refetch, isLoading } = trpc.openai.getPrompt.useQuery(keyword, {
    enabled: false, // Disabling the query from running automatically
  });

  // Function to fetch prompt data based on the keyword
  const fetchData = async () => {
    if (keyword.trim() === '') { // Checking if the keyword is empty
      setError('Keyword cannot be empty'); // Setting error message
      return;
    }

    if (keyword.length > 20) { // Checking if the keyword exceeds 20 characters
      setError('Keyword cannot be longer than 20 characters'); // Setting error message
      return;
    }

    setError(''); // Clearing any previous error messages

    const result = await refetch(); // Refetching the data using trpc
    if (result.data?.prompt != undefined && result.data.prompt != null) { // Checking if prompt data is received
      const promptt = result.data.prompt; // Assigning the received prompt to a variable
      setPrompt(promptt); // Setting the prompt state
    }
  };

  // Return statement for rendering the component JSX
  return (
    <div className="max-w-md mx-auto">
      <div>Generate a prompt based on a keyword/topic</div>
      <div className="flex flex-col items-stretch mt-2">
        {/* Input field for entering the keyword */}
        <input
          type="text"
          placeholder="Enter a keyword"
          className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={keyword} // Binding the keyword value to the state
          onChange={(e) => setKeyword(e.target.value)} // Updating the keyword state on change
        />
        <button
          onClick={fetchData} // Handling button click to fetch data
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4 overflow-wrap break-word">
        {isLoading && <p>Loading...</p>} {/* Displaying loading state */}
        {error && <p className="text-red-500">{error}</p>} {/* Displaying error message */}
        {prompt && <p className="p-2 border-b border-gray-200">{prompt}</p>} {/* Displaying the generated prompt */}
      </div>
    </div>
  );
}
