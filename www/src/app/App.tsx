import { useEffect, useState } from "react";
import arrowIcon from './../icons/arrow.svg'
import { ILang } from "../types/ILang";
import List from "./List";
import axios from "axios";
import { IRepo } from "../types/IRepo";
import starIcon from './../icons/starIcon.svg'
import forkIcon from './../icons/forkIcon.svg'


const App: React.FC = () => {


    const [langs, setLangs] = useState<ILang[]>([])
    const [lang, setLang] = useState<string>("")
    const [select, setSelect] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [repos, setRepos] = useState<IRepo[]>([])

    const token: string = import.meta.env.PUBLIC_TOKEN
    const src: string  = `https://api.github.com/search/repositories?q=language:${lang}&page=1&per_page=30$sort=stars`


    const getRepo = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(src, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setRepos(res.data.items)
            console.log(res.data.items)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const random: number = getRandomInt(30)

    const search = () => {
        setRepos([])
        if (lang) {
            getRepo()
        }
    }


    return (
       <main className="main">
            <div className="finder">
                <h2>GitHub Repository Finder</h2>
                <div onClick={() => setSelect(!select)} className="langs">
                    {lang ? lang : "Select a Language"} <img style={{"rotate": select ? "-180deg" : ""}} src={arrowIcon} alt="" width={24} height={24}/>
                </div>
                {select && <List setSelect={setSelect} setLang={setLang} langs={langs} setLangs={setLangs}/>}
               {(repos.length > 0 && lang && !select) && 
                <div className="repo">
                    <h4>{repos[random].name}</h4>
                    <p>{repos[random].description}</p>
                    <div className="topics">
                        <p>{lang}</p>
                        <p> <img src={forkIcon} alt="" width={10} height={10}/>{repos[random].forks}</p>
                        <p> <img src={starIcon} alt="" width={10} height={10}/>{repos[random].stargazers_count}</p>
                    </div>
                </div>}
                {isLoading && <p className="loading">Loading...</p>}
                {!isLoading && <button className="searchBtn" onClick={search}>
                    {repos.length === 0 && "Search"}
                    {repos.length > 0 && "Refresh"}
                </button>}
            </div>
       </main>
    )
}

export default App;
