import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { FaceID, Home } from './pages/index.ts';
import ErrorPage from './pages/error/error.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    //May end up changing home to being the default child and having the parent element just be the side bar
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "faceid",
        element: <FaceID />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
