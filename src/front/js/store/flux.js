const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [],
      artists: [],
      albums: [],
      tracks: [],
      token: null,
      refreshToken: null
     
    },
    actions: {
      // Use getActions to call a function within a fuction
      /* exampleFunction: () => {
        getActions().changeColor(0, "green");
      }, */

      //----->>>  function Message
      /* getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      }, */
      //-----> function color
      /* changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      }, */
      //LLAMADO A API DE FORMA GENERICA
      /* apiCall: ({url, params, method, body, headers}) => {
        return fetch(url, {
          params,
          method,
          body,
          headers
        })
      }, */
      //LLAMADA A SPOTIFY
      spotifyAuthCall: async (code) => {
        try{
          const params = {
            code,
            grant_type: "authorization_code",
            redirect_uri: process.env.REACT_APP_SPOTIFY_CALLBACK_HOST,
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
          };
          //ES UNA URL
          const searchParams = Object.keys(params).map( (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&")
          console.log(searchParams);
  

          //AQUI VA EL FETCH

          /* const spotifyCall = await apiCall({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            body: searchParams,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
          });
  
          console.log(spotifyCall);
          //AWAIT para que envie el resultado
          return await spotifyCall.json(); */
          const opts = {
            method: "POST",
            body: searchParams,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
          }

          await fetch("https://accounts.spotify.com/api/token", opts)
          .then( (response) =>{ 
            if(response.status == 200) return response.json();
            else alert("Existe un error");
            return false;
          } )
          .then( (result ) => {console.log( " Esto viene de Backend " , result);
          sessionStorage.setItem("token", result.access_token);
          sessionStorage.setItem("refresh_token", result.refresh_token)
          setStore({ token : result.access_token});
          setStore({ refreshToken: result.refresh_token });
          return true;
        
        })


        } catch (error) {
          console.log(error);
        }
        

      },

      searchArtists: async (paramsArray) => {
        try{
          const url = new URL("https://api.spotify.com/v1/search");

          for (const item of paramsArray) {
            /* console.log(item); */
            const key = Object.keys(item)[0];
           /*  console.log(item[key]); */
            url.searchParams.append(key, item[key]);
          }
          //console.log(url);
          const store = getStore();
          const opts = {
            method: "GET",
            headers: { Authorization : "Bearer" + " " + store.token },
          }
          await fetch(url,opts)
          .then((response) => response.json())
          .then( (result) => {
            console.log(result);
            setStore({ artists: result.artists.items });
            setStore({ albums: result.albums.items });
            setStore({ tracks: result.tracks.items });
          })
          
          


        } catch (error) {
          console.log(error);
        }
       

      },
      


      //>>>>>>------------->>>>>>>>>> POST TOKEN A SPOTIFY
     /*  CreateToken: () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append(
          "Cookie",
          "__Host-device_id=AQDZddikgdLzKWxr-0J9PS31NGxBCJBpw-CTH7lwpy9leGZcoDL_Jz0lw5U4N6xMLErxDliIDWWBNN4ZxlWC6HIyE4MVYAU0IiY; sp_tr=false"
        );

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        urlencoded.append("client_id", "1518c1c1d69b42ed838d13b3cf8fbc3d");
        urlencoded.append("client_secret", "f7533f65f5bc4696a403af5297cbd8cd");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch("https://accounts.spotify.com/api/token", requestOptions)
          .then((response) => {
            if (response.status == 200) return response.json();
            else alert("Existe un error");
            return false;
          })
          .then((result) => {
            console.log("Esto viene del backend", result);
            sessionStorage.setItem("token", result.access_token);
            setStore({ token: result.access_token });
            return true;
          })
          .catch((error) => console.log("error", error));
      }, */
    },
  };
};

export default getState;
