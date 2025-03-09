import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Import QueryClientProvider

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}> {/* ✅ Wrap Redux Provider */}
      <QueryClientProvider client={queryClient}> {/* ✅ Wrap with QueryClientProvider */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
