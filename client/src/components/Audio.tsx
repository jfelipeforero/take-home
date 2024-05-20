import { useState } from 'react';
import { trpc } from '../utils/trpc';

export function AudioGenerator() {
  // State for managing the input text
  const [text, setText] = useState<string>('');
  
  // State for managing the audio buffer
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  
  // State for managing error messages
  const [error, setError] = useState<string>('');
  
  // State for managing the loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Destructuring refetch function from the useQuery hook for fetching audio data
  const { refetch } = trpc.openai.getAudioFromText.useQuery(text, {
    enabled: false, // Disabling the query from running automatically
  });

  // Function to fetch data when the user clicks the fetch button
  const fetchData = async () => {
    if (text.trim() === '') { // Checking if the input text is empty
      setError('Text cannot be empty'); // Setting error message
      setAudioBuffer(null); // Clearing the audio buffer
      return;
    }

    setError(''); // Clearing any previous error messages
    setIsLoading(true); // Setting loading state to true

    try {
      const result = await refetch(); // Refetching the data using trpc
      if (result.data) { // Checking if data is received
        const audioData = result.data.audio.data; // Extracting audio data
        const audioContext = new (window.AudioContext || window.AudioContext)(); // Creating a new AudioContext
        const buffer = await audioContext.decodeAudioData(new Uint8Array(audioData).buffer); // Decoding audio data
        setAudioBuffer(buffer); // Setting the decoded audio buffer
      } else {
        setError('Error: No data received'); // Setting error message if no data is received
        setAudioBuffer(null); // Clearing the audio buffer
      }
    } catch (error) {
      setError('Error fetching audio'); // Setting error message if an exception occurs
      setAudioBuffer(null); // Clearing the audio buffer
    } finally {
      setIsLoading(false); // Setting loading state to false
    }
  };

  // Function to play the audio when the play button is clicked
  const playAudio = () => {
    if (audioBuffer) { // Checking if audio buffer is available
      const audioContext = new (window.AudioContext || window.AudioContext)(); // Creating a new AudioContext
      const source = audioContext.createBufferSource(); // Creating a buffer source
      source.buffer = audioBuffer; // Assigning the audio buffer to the source
      source.connect(audioContext.destination); // Connecting the source to the destination
      source.start(); // Starting the audio playback
    }
  };

  // Return statement for rendering the component JSX
  return (
    <div className="max-w-md mx-auto">
      <div>Generate an audio based on text</div>
      <div className="flex flex-col items-stretch mt-2">
        {/* Input field for entering text */}
        <input
          type="text"
          placeholder="Enter a text"
          className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={text} // Binding the input value to the text state
          onChange={(e) => setText(e.target.value)} // Updating the text state on input change
        />
        {/* Button for fetching data */}
        <button
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Fetch Data
        </button>
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>} {/* Displaying loading state */}
        {error && <p className="text-red-500">{error}</p>} {/* Displaying error message */}
        {audioBuffer && (
          <button
            onClick={playAudio}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Play Audio
          </button>
        )} {/* Displaying play button if audio buffer is available */}
      </div>
    </div>
  );
}

