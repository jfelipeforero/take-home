import { useState } from 'react';
import { trpc } from './utils/trpc';

// Define the Task type
type Task = 'summarization' | 'sentimentAnalysis';

export function FileAnalysis() {
  const [fileContent, setFileContent] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>('summarization');

  const { refetch } = trpc.openai.getFileAnalysis.useQuery(
    { text: fileContent, task: selectedTask },
    { enabled: false }
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      setFileContent(content);
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (fileContent.trim() === '') {
      setError('File content cannot be empty');
      setResponse('');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await refetch();
      if (result.data?.analysis != null) {
        setResponse(result.data.analysis);
      } else {
        setError('Error: No data received');
        setResponse('');
      }
    } catch (error) {
      setError('Error fetching data');
      setResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>Upload a text file for analysis</div>
      <div className="flex flex-col items-stretch mt-2">
        <input
          type="file"
          accept=".txt"
          className="w-full text-gray-700 focus:outline-none"
          onChange={handleFileUpload}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="task-select" className="block text-gray-700">Select Task:</label>
        <select
          id="task-select"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value as Task)}
          className="w-full mt-2 p-2 border rounded-md"
        >
          <option value="summarization">Summarization</option>
          <option value="sentimentAnalysis">Sentiment Analysis</option>
        </select>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Analyze File
        </button>
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {response && (
          <div className="mt-4">
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
