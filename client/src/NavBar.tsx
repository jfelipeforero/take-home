import { useState } from 'react';
import { AudioGenerator } from './Audio';
import { FileAnalysis } from './File';
import { ImageGenerator } from './Image';
import { PromptGenerator } from './Prompt';

export function Navbar() {
  const [selectedComponent, setSelectedComponent] = useState('prompt');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'prompt':
        return (
          <div className="flex items-center justify-center mt-10"> 
          <PromptGenerator />;
          </div>
        )
      case 'image':
        return (
          <div className="flex items-center justify-center mt-10"> 
          <ImageGenerator />;
          </div>
        ) 
      case 'file':
        return (
          <div className="flex items-center justify-center mt-10"> 
          <FileAnalysis />;
          </div>
        )  
      case 'audio':
        return (
          <div className="flex items-center justify-center mt-10"> 
          <AudioGenerator />;
          </div>
        ) 
      default:
        return <PromptGenerator/>;
    }
  };

  return (
    <div>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <a 
            onClick={() => setSelectedComponent('prompt')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'prompt' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            Prompt Generator
          </a>
          <a 
            onClick={() => setSelectedComponent('image')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'image' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            Image Generator
          </a>
          <a
            onClick={() => setSelectedComponent('file')}
            className={`text-gray-800 transition-colors duration-300 transform dark:text-gray-200 mx-1.5 sm:mx-6 ${
              selectedComponent === 'file' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent hover:border-blue-500'
            }`}
          >
            File Analysis
          </a>
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
      <div className="p-6">
        {renderComponent()}
      </div>
    </div>
  );
}

