import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login.jsx";
import DashBoard from "./views/DashBoard.jsx";
import CadastroCidade from "./views/CadastroCidade.jsx";
import CadastroBairro from "./views/CadastroBairro.jsx";
import CadastroUsuario from "./views/CadastroUsuario.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/relatorio',
                element: <Navigate to='/' />
            },
            {
                path: '/',
                element: <DashBoard />
            },
            {
                path: '/cadastro/cidade',
                element: <CadastroCidade />
            },
            {
                path: '/cadastro/bairro',
                element: <CadastroBairro />
            },
            {
                path: '/cidade/:id',
                element: <CadastroCidade />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/cadastro/usuario',
                element: <CadastroUsuario />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
]);

export default router;
