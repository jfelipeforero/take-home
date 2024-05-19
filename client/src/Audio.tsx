import { useState, useEffect } from 'react';
import { trpc } from './utils/trpc';

export function AudioGenerator() {
  const [text, setText] = useState<string>('');
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refetch } = trpc.openai.getAudioFromText.useQuery(text, {
    enabled: false,
  });

  const fetchData = async () => {
    if (text.trim() === '') {
      setError('Text cannot be empty');
      setAudioBuffer(null);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await refetch(); 
      if (result.data) { 
        const audioData = result.data.audio.data;
        const audioContext = new (window.AudioContext || window.AudioContext)();
        const buffer = await audioContext.decodeAudioData(new Uint8Array(audioData).buffer);
        setAudioBuffer(buffer);
      } else {
        setError('Error: No data received');
        setAudioBuffer(null);
      }
    } catch (error) {
      setError('Error fetching audio');
      setAudioBuffer(null);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioBuffer) {
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>Generate an audio based on text</div>
      <div className="flex flex-col items-stretch mt-2">
        <input
          type="text"
          placeholder="Enter a text"
          className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
        {audioBuffer && (
          <button
            onClick={playAudio}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Play Audio
          </button>
        )}
      </div>
    </div>
  );
}
