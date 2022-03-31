import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
//------>>>> Images & Styles
import CoverVideo from "../../img/music02.mp4";
import "../../styles/cover.css";

const spotifyUrl = ` https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;

export const Cover = () => {
    const { store, actions } = useContext(Context);

    const tokenNew = store.token;
    console.log(tokenNew)
    const refreshToken = store.refreshToken;
    console.log(refreshToken);

const location = useLocation();
/* console.log(location);   */ 


const authenticateUser = async (spotifyCode) => {
    const result = await actions.spotifyAuthCall(spotifyCode);
    console.log(result);
}



useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //Clase de JS para obtener parametros de una URL
    /* console.log(urlParams); */
    const spotifyCode = urlParams.get("code");
    console.log(spotifyCode);
    if(spotifyCode) authenticateUser(spotifyCode);

}, [location.search]);


//Con el click me cambiara la url actual por la nueva url de spotify para pedir la autentificacion
//y esa url me regresara a mi proyecto con un codigo
    const handleLoginClick = () => {
        window.location.replace(spotifyUrl);
    }


    return (
        <div className="cover-container">
			<video className="video" src={CoverVideo} autoPlay loop muted />
			<h1 className="cover-h1">LA MÚSICA ES TODO</h1>
            {store.token && store.token != "" && store.token != undefined ? (<h1 className="text-white">Bienvenido a Spotify</h1>) : (
                 <div className="ml-auto ">
                 <button className="btn btn-light mt-5" onClick={handleLoginClick}>Inicio Sesión</button>
            </div>
            )
            }
           
		
		</div>
    )
}