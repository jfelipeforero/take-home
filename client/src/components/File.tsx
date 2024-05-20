import { useState } from 'react';
import { trpc } from '../utils/trpc';

// Define the Task type with two possible values
type Task = 'summarization' | 'sentimentAnalysis';

// Defining the FileAnalysis component
export function FileAnalysis() {
  // State for managing the content of the uploaded file
  const [fileContent, setFileContent] = useState<string>('');
  
  // State for managing the response received from the API
  const [response, setResponse] = useState<string>('');
  
  // State for managing error messages
  const [error, setError] = useState<string>('');
  
  // State for managing the loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // State for managing the selected task (summarization or sentiment analysis)
  const [selectedTask, setSelectedTask] = useState<Task>('summarization');

  // Destructuring refetch function from the useQuery hook for fetching analysis data
  const { refetch } = trpc.openai.getFileAnalysis.useQuery(
    { text: fileContent, task: selectedTask },
    { enabled: false } // Disabling the query from running automatically
  );

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clearing any previous error messages
    const file = event.target.files?.[0]; // Getting the uploaded file
    if (!file) { // Checking if no file is selected
      setError('No file selected'); // Setting error message
      return;
    }

    const reader = new FileReader(); // Creating a FileReader to read the file content
    reader.onload = () => { // Defining the onload event handler
      const content = reader.result as string; // Getting the file content as a string
      setFileContent(content); // Setting the file content state
    };
    reader.onerror = () => { // Defining the onerror event handler
      setError('Error reading file'); // Setting error message if reading fails
    };
    reader.readAsText(file); // Reading the file content as text
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (fileContent.trim() === '') { // Checking if the file content is empty
      setError('File content cannot be empty'); // Setting error message
      setResponse(''); // Clearing the response state
      return;
    }

    setError(''); // Clearing any previous error messages
    setIsLoading(true); // Setting loading state to true

    try {
      const result = await refetch(); // Refetching the data using trpc
      if (result.data?.analysis != null) { // Checking if analysis data is received
        setResponse(result.data.analysis); // Setting the response state with the analysis data
      } else {
        setError('Error: No data received'); // Setting error message if no data is received
        setResponse(''); // Clearing the response state
      }
    } catch (error) {
      setError('Error fetching data'); // Setting error message if an exception occurs
      setResponse(''); // Clearing the response state
    } finally {
      setIsLoading(false); // Setting loading state to false
    }
  };

  // Return statement for rendering the component JSX
  return (
    <div className="max-w-md mx-auto">
      <div>Upload a text file for analysis</div>
      <div className="flex flex-col items-stretch mt-2">
        {/* Input field for uploading a file */}
        <input
          type="file"
          accept=".txt"
          className="w-full text-gray-700 focus:outline-none"
          onChange={handleFileUpload} // Handling file upload on change
        />
      </div>
      <div className="mt-4">
        {/* Dropdown for selecting the analysis task */}
        <label htmlFor="task-select" className="block text-gray-700">Select Task:</label>
        <select
          id="task-select"
          value={selectedTask} // Binding the selected task value to the state
          onChange={(e) => setSelectedTask(e.target.value as Task)} // Updating the selected task state on change
          className="w-full mt-2 p-2 border rounded-md"
        >
          <option value="summarization">Summarization</option>
          <option value="sentimentAnalysis">Sentiment Analysis</option>
        </select>
      </div>
      <div className="mt-4">
        {/* Button for submitting the form */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Analyze File
        </button>
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>} {/* Displaying loading state */}
        {error && <p className="text-red-500">{error}</p>} {/* Displaying error message */}
        {response && (
          <div className="mt-4">
            <p>{response}</p> {/* Displaying the response from the API */}
          </div>
        )}
      </div>
    </div>
  );
}

