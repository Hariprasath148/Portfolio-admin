import  "../css/header.css";
import { User } from "lucide-react";
import { ModeButton } from "./ModeButton.jsx";

export const Header = ()=> {
    return (
        <>
            <div className="header p-2 d-flex justify-content-between align-align-items-center">
                <div id="header-inside-one">
                    <svg width="665" className="logo-svg" height="713" viewBox="0 0 665 713" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_1_9)">
                        <path d="M64 297.5L14.5 351L64 407.5V297.5Z" />
                        <path d="M183.5 166L119 235.5L118.5 469L183.5 541.5V381H249.5V615L314.5 685V22L250.5 91.5V324.5H183.5V166Z" />
                        <path d="M650.5 351L602 297.5V407.5L650.5 351Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M353 19.5L348 685L419.5 615L418 381H495L549 315V235.5L353 19.5ZM486.5 243L422 179L418 324.5H462L486.5 301V243Z" />
                        <path d="M64 297.5L14.5 351L64 407.5V297.5Z" strokeWidth="15"/>
                        <path d="M183.5 166L119 235.5L118.5 469L183.5 541.5V381H249.5V615L314.5 685V22L250.5 91.5V324.5H183.5V166Z"  strokeWidth="15"/>
                        <path d="M650.5 351L602 297.5V407.5L650.5 351Z"  strokeWidth="15"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M353 19.5L348 685L419.5 615L418 381H495L549 315V235.5L353 19.5ZM486.5 243L422 179L418 324.5H462L486.5 301V243Z"  strokeWidth="15"/>
                        </g>
                    </svg>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <ModeButton/>
                </div>
                <div className="d-flex justify-content-center align-items-center rounded-pill" id="header-inside-three">
                    <User size={38} strokeWidth={1}/>
                </div>
            </div>
        </>
    );
}