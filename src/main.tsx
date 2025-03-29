import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './Context/AuthContext.tsx'
import { JobSearchProvider } from './Context/JobSearchContext.tsx'
const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryclient}>



    <BrowserRouter>

      <GoogleOAuthProvider clientId='15124092057-q7saopofjt97svqnsd47t12n7ckn29qi.apps.googleusercontent.com'>

        <AuthProvider>

            <JobSearchProvider>

              <App />

            </JobSearchProvider>

        </AuthProvider>

      </GoogleOAuthProvider>

    </BrowserRouter>



  </QueryClientProvider >

)
