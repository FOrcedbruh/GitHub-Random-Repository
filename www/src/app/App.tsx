import { useEffect, useState } from "react";
import arrowIcon from './../icons/arrow.svg'
import { ILang } from "../types/ILang";
import List from "./List";
import axios from "axios";


const App: React.FC = () => {


    const [langs, setLangs] = useState<ILang[]>([])
    const [lang, setLang] = useState<string>("")
    const [select, setSelect] = useState<boolean>(false)

    const token: string = import.meta.env.PUBLIC_TOKEN
    console.log(token)
    const src: string  = `https://api.github.com/search/repositories?q=${lang}`


    const getRepo = async () => {
        const res = await axios.get(src, {
            headers: {
                "Authorization": `Bearer ${"token"}`
            }
        })

        console.log(res.data)
    }


    useEffect(() => {
        getRepo()
    }, [lang])


    return (
       <main className="main">
            <div className="finder">
                <h2>GitHub Repository Finder</h2>
                <div onClick={() => setSelect(!select)} className="langs">
                    {lang ? lang : "Select a Language"} <img style={{"rotate": select ? "-180deg" : ""}} src={arrowIcon} alt="" width={24} height={24}/>
                </div>
                {select && <List setSelect={setSelect} setLang={setLang} langs={langs} setLangs={setLangs}/>}
            </div>
       </main>
    )
}

export default App;
