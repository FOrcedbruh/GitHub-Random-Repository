import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ILang } from "../types/ILang";


interface ListPropsType {
    langs: ILang[]
    setLangs: Dispatch<SetStateAction<ILang[]>>
    setLang: Dispatch<SetStateAction<string>>
    setSelect: Dispatch<SetStateAction<boolean>>
}

const List: React.FC<ListPropsType> = ({ langs, setLangs, setLang, setSelect }) => {

    const src: string = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"

    const getLangs = async () => {
        const res = await axios.get(src)

        setLangs(res.data)
    }


    useEffect(() => {
        getLangs()
    }, [langs])


    const click = (value: string) => {
        setLang(value)
        setSelect(false)
    }

    return (
        <ul>
            {langs ? langs?.map((lang, index) => {
                return (
                    <li onClick={() => click(lang.value)} key={index}>{lang.value}</li>
                )
            }) : <>Loading...</>}
        </ul>
    )
}

export default List;