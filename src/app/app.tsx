import Provider from "@/app/components/provider";
import router from "@/app/router";
import { RouterProvider } from "react-router";

const App: React.FC = () => {

    return <Provider>
        <RouterProvider router={router} />
    </Provider>
}

export default App;