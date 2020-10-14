import React, {useState} from "react";

import { fetchFollowing } from "./api";

export default function FollowForm({name, onSubmit}) 
{
    const [title, setTitle] = useState(name);
    // const [isPresent, setIsPresent] = useState(false);
    var idToDelete = -1;
    
    function handleSubmit(event) {
        event.preventDefault();
        
        var found = 0;
        fetchFollowing()
        .then((response) => {
            setTitle(name);
            found = response.find((item) => item.title===title);
            if (found) {
                // setIsPresent(true);
                idToDelete = found.id;
                onSubmit(idToDelete);
            }
            else {
                // setIsPresent(false);
            }
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