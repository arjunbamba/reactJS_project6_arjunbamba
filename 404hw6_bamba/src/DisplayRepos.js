import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

import { createPortal } from "react-dom";
import { fetch_profile } from "./fetch_profile";

const modalContainer = document.getElementById("modal-container");


export default function DisplayRepos({ onClose }) {

    const { member } = useParams();

    const [profile_Response, setProfile_Response] = useState([]);

    function load_Profile(member) {
        let url = "https://api.github.com/users/" + member + "/repos";
        return fetch_profile(url)
        .then((response) => {
            // console.log(response);
            setProfile_Response(response);
            
            // var myarray = [];
            // myarray.push(response);
            // let result = myarray.filter((item) => item.login===member);
            // console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        load_Profile(member);  //PUT member HERE AS 2ND PARAMETER TO RENDER MODAL FOR MEMBER 
    }, [member]);

    let results = profile_Response
    .filter(function(result){
        return result !== undefined;
    });
    // console.log(results);

    return createPortal (
      <>
      <div className="modal-backdrop show"></div>
      <div className="modal" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style={{ display: "block", overflow: "auto" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Member Repos (can scroll if many)</h5>
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
                {results.map((result) => {
                    return (
                        <>
                        <p>Repository is: <a href={result.html_url} target="_blank">{result.name}</a></p>
                        <p>Description is: {result.description}</p>
                        <hr></hr>
                        </>
                    );
                })}
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