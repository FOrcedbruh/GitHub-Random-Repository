import { useState } from "react";
import arrowIcon from './../icons/arrow.svg'
import { ILang } from "../types/ILang";
import List from "./List";


const App: React.FC = () => {


    const [langs, setLangs] = useState<ILang[]>([])
    const [lang, setLang] = useState<string>("")
    const [select, setSelect] = useState<boolean>(false)

    return (
       <main className="main">
            <div className="finder">
                <h2>GitHub Repository Finder</h2>
                <div onClick={() => setSelect(!select)} className="langs">
                    {lang ? lang : "Select a Language"} <img style={{"rotate": select ? "-180deg" : ""}} src={arrowIcon} alt="" width={24} height={24}/>
                </div>
                {select && <List setLang={setLang} langs={langs} setLangs={setLangs}/>}
            </div>
       </main>
    )
}

export default App;
