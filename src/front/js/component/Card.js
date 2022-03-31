import React from "react";

export default function card (props){
    return (
        <div className="card-body" style={{ width: "150px" }}>
            <div>{props.img}</div>
            <h4>{props.name}</h4>
            <button>Albums</button>
        </div>
    )
}

/* style={{ width: "18rem" }} */