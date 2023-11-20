import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { DbManage, ImageProcessing, Home } from './pages/index.ts';
import ErrorPage from './pages/error/error.tsx';
import './index.css'
import { FireBaseProvider } from './providers/firebase.tsx';

const router = createBrowserRouter([
  {
    //May end up changing home to being the default child and having the parent element just be the side bar
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "imageProcessing",
        element: <ImageProcessing />
      },
      {
        path: "dbmanage",
        element: <DbManage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FireBaseProvider>
      <RouterProvider router={router} />
    </FireBaseProvider>
  </React.StrictMode>
)
