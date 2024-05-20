import { Navbar } from "./components/NavBar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/trpc';

export default function App() {
  // Initializing QueryClient state with a new instance of QueryClient
  const [queryClient] = useState(() => new QueryClient());
  
  // Initializing TRPC client state with a new client instance using httpBatchLink for HTTP requests
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // Configuring the link with the API URL from environment variables
        httpBatchLink({
          url: process.env.REACT_APP_API_URL!,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}> 
      <QueryClientProvider client={queryClient}>
        <Navbar/>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

