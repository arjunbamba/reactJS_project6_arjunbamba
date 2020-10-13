import React, {useState, useEffect} from "react";
import FollowForm from "./FollowForm";
import UnfollowForm from "./UnfollowForm";

import { fetchFollowing, fetchFollow, destroyFollow, saveFollow } from "./api";

export default function DisplayButton ({nameToCheck, handleSubmit, handleDelete}) {

    const [isPresent, setIsPresent] = useState(false);
    // var isPresent = false;

    function check(name) {
        var found = 0;
        fetchFollowing()
        .then((response) => {
            found = response.find((item) => item.title==name);
            // console.log(found);
            if (found) {
                setIsPresent(true);
            }
            else {
                setIsPresent(false);
            }
        })
    }

    useEffect(() => {
        check(nameToCheck);  //PUT member HERE AS 2ND PARAMETER TO RENDER MODAL FOR MEMBER 
    }, [nameToCheck]);

    return (
        <>
        {isPresent ? <UnfollowForm name={nameToCheck} onSubmit={handleDelete} /> : <FollowForm name={nameToCheck} onSubmit={handleSubmit} />}
        </>
    );

}