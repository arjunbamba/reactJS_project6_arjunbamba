import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { fetch_members } from "./fetch_members";

import DisplayButton from "./DisplayButton.js";

export default function DisplayMembers({follow, unfollow, show, hide, isProfileModalShown}) {
    const [fetch_Response, setFetch_Response] = useState([]);

    function load_members() {       
        return fetch_members()
        .then((response) => {
            setFetch_Response(response);
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    useEffect(() => {
        load_members();
    }, []);
    
    function handleSubmit(title) {
        follow(title);
    }
    function handleDelete(deleteID) {
        unfollow(deleteID);
    }
    
    let results = fetch_Response;

    return (
        <>
        {results.map((result) => {
            let avatar = result.avatar_url;
            let name = result.login;
            // let url = result.url;
            
            return (
            <div key={(Math.random())} style={{textAlign: "center"}}>
                <br></br>
                
                {/* DO NOT DISPLAY PROFILE HERE BECAUSE WE ARE MAPPING IN LOOP */}
                {/* 
                {isProfileModalShown && (
                <DisplayProfile
                onClose={hide}
                url={url}
                login={name}
                />
                )} 
                */}
                
                <Link to={"/member/" + name}>
                    <img src={avatar} alt="thumbnail" onClick={show}></img>
                </Link>
                
                <br></br><br></br>
                
                <Link to={"/member/" + name}>
                    <h5 onClick={show}><p>{name}</p></h5>
                </Link>
                <br></br>
                <Link to={"/repos/" + name}>
                    <button className="btn btn-primary">Repos</button>
                </Link>
                <br></br><br></br>
                <DisplayButton nameToCheck={name} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
                <br></br>
                <br></br>
                <hr style={{backgroundColor: "black"}}></hr>
            </div>
            );
        })}
        </>
    );
}