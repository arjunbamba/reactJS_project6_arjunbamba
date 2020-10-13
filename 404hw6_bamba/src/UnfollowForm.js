import React, {useState, useEffect} from "react";

import { fetchFollowing, fetchFollow, destroyFollow, saveFollow } from "./api";

export default function FollowForm({name, onSubmit}) 
{
    const [title, setTitle] = useState(name);
    const [isPresent, setIsPresent] = useState(false);
    var idToDelete = -1;
    
    function handleSubmit(event) {
        event.preventDefault();
        
        var found = 0;
        fetchFollowing()
        .then((response) => {
            found = response.find((item) => item.title==title);
            if (found) {
                setIsPresent(true);
                idToDelete = found.id;
            }
            else {
                setIsPresent(false);
            }
            onSubmit(idToDelete);
        })  
    }
    
    return (
    <form onSubmit={handleSubmit}>
        <button type="submit" value={name} className="btn btn-primary">
            Unfollow
        </button>
    </form>
    );
}