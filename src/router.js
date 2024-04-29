import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from "./components/auth/Login";
import Register from "./components/auth/register";
import List from "./components/medicine/List";
import Add from "./components/medicine/Add";
import View from "./components/medicine/View";
import Edit from "./components/medicine/Edit";

const router = createBrowserRouter([
    {path:'/',element:<App/>},
    {path:'register', element:<Register/>},
    {path:'login',element:<Login/>},
    {path:'list/posts',element:<List/>},
    {path:'list/posts/create',element:<Add/>},
    {path:'list/posts/:postId',element:<View/>},
    { path :'/list/posts/:postId/edit', element: <Edit/>}

    
]);

export default router;