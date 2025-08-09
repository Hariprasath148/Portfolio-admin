import "../css/modeChange.css";
import {Sun , Moon} from "lucide-react";

export const ModeButton = ()=> {
    const changeMode = ()=> {
        document.querySelector("body").classList.toggle("dark");
    }
    return (
        <>
            <input type="checkbox" id="modeChange-checkBox" onClick={changeMode} />
            <label htmlFor="modeChange-checkBox" id="modeChange-label">
                <Moon id="modeChange-icon-moon"/>
                <Sun id="modeChange-icon-sun"/>
            </label>
        </>
    );
}