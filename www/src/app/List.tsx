import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ILang } from "../types/ILang";


interface ListPropsType {
    langs: ILang[]
    setLangs: Dispatch<SetStateAction<ILang[]>>
    setLang: Dispatch<SetStateAction<string>>
}

const List: React.FC<ListPropsType> = ({ langs, setLangs, setLang }) => {

    const src: string = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"

    const getLangs = async () => {
        const res = await axios.get(src)

        setLangs(res.data)
    }


    useEffect(() => {
        getLangs()
    }, [langs])

    return (
        <ul>
            {langs?.map(lang => {
                return (
                    <li onClick={() => setLang(lang.value)} key={lang.title}>{lang.value}</li>
                )
            })}
        </ul>
    )
}

export default List;