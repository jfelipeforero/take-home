import { useState } from 'react';

import { AudioGenerator } from './Audio';
import { FileAnalysis } from './File';
import { ImageGenerator } from './Image';
import { PromptGenerator } from './Prompt';

// Defining the Navbar component
export function Navbar() {
  // State to keep track of the currently selected component
  const [selectedComponent, setSelectedComponent] = useState('prompt');

  // Function to render the appropriate component based on the selectedComponent state
  const renderComponent = () => {
    switch (selectedComponent) {
      // Case for rendering PromptGenerator component
      case 'prompt':
        return (
          <div className="flex items-center justify-center mt-10">
            <PromptGenerator />
          </div>
        );
      // Case for rendering ImageGenerator component
      case 'image':
        return (
          <div className="flex items-center justify-center mt-10">
            <ImageGenerator />
          </div>
        );
      // Case for rendering FileAnalysis component
      case 'file':
        return (
          <div className="flex items-center justify-center mt-10">
            <FileAnalysis />
          </div>
        );
      // Case for rendering AudioGenerator component
      case 'audio':
        return (
          <div className="flex items-center justify-center mt-10">
            <AudioGenerator />
          </div>
        );
      // Default case for rendering PromptGenerator component
      default:
        return <PromptGenerator />;
    }
  };

  // Return statement for rendering the Navbar and the selected component
  return (
    <div>
      {/* Navigation bar */}
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          {/* Link for selecting the PromptGenerator component */}
          <a 
            onClick={() => setSelectedComponent('prompt')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'prompt' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            Prompt Generator
          </a>
          {/* Link for selecting the ImageGenerator component */}
          <a 
            onClick={() => setSelectedComponent('image')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'image' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            Image Generator
          </a>
          {/* Link for selecting the FileAnalysis component */}
          <a
            onClick={() => setSelectedComponent('file')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'file' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            File Analysis
          </a>
          {/* Link for selecting the AudioGenerator component */}
          <a 
            onClick={() => setSelectedComponent('audio')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'audio' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            Text to Audio
          </a> 
        </div>
      </nav>
      {/* Container for rendering the selected component */}
      <div className="p-6">
        {renderComponent()}
      </div>
    </div>
  );
}

