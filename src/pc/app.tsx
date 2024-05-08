import Provider from "@/pc/components/provider";
import router from "@/pc/router";
import { RouterProvider } from "react-router";

const App: React.FC = () => {

    return <Provider>
        <RouterProvider router={router} />
    </Provider>
}

export default App;