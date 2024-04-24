import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Pets } from "./pages/Pets/Pets";
import { PetDetails } from "./pages/PetDetails";
import { Shelter } from "./pages/Admin/Shelter/Shelter";
import { PetList } from "./pages/Admin/PetList/PetList";
import { AuthoHOC } from "./components/common/AuthHOC/AuthHOC";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/pets',
        children: [
            {
                index: true,
                element: <Pets />,
            },
            {
                path: '/pets/:id',
                element: <PetDetails />
            },
        ],
    },
    {
        path: '/admin',
        children:[
            {
                index: true,
                element: <Shelter />,
            },
            {
                path: '/admin/pets',
                element: <AuthoHOC />,
                children: [
                    {
                        index: true,
                        element: <PetList />,
                    },
                ],
            },
        ],
    },
])

export default router
