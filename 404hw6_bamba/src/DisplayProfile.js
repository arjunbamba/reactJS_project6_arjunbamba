import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

import { createPortal } from "react-dom";
import { fetch_profile } from "./fetch_profile";

// const modalContainer = document.getElementById("modal-container");

export default function DisplayProfile({ onClose }) {

    const { member } = useParams();

    const [profile_Response, setProfile_Response] = useState([]);

    function load_Profile(member) {
        let url = "https://api.github.com/users/" + member;
        return fetch_profile(url)
        .then((response) => {
            // console.log(response);
            setProfile_Response(response);
            
            var myarray = [];
            myarray.push(response);
            let result = myarray.filter((item) => item.login===member);
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        load_Profile(member);  //PUT member HERE AS 2ND PARAMETER TO RENDER MODAL FOR MEMBER 
    }, [member]);

    let result = profile_Response;

    return createPortal (
      <>
      <div className="modal-backdrop show"></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Member Profile</h5>
              <Link to="/">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Link>
            </div>
            <div className="modal-body">
              <p>Name is: {result.name}</p>
              <p>Company is: {result.company}</p>
              <p>Location is: {result.location}</p>
              <p>Bio is: {result.bio}</p>
              <p>Following: {result.following}</p>
              <p>Followers: {result.followers}</p>
            </div>
            <div className="modal-footer">
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={onClose}
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>,
    // modalContainer
    document.getElementById("modal-container")
  );
}