import { BrowserRouter, Route, Routes } from "react-router-dom";
import Canil from "./Canil";
import Tabela from "./Tabela"
export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/Canil" element={<Canil></Canil>}></Route>
                <Route exact path="*" element={<Canil></Canil>}></Route>
                <Route exact path="/Tabela" element={<Tabela></Tabela>}></Route>

            </Routes>
        </BrowserRouter>
    )
}