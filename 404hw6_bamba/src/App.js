import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Switch, Route /*, Link, NavLink, Redirect, useHistory, Redirect */ } from "react-router-dom";

import DisplayMembers from "./DisplayMembers.js";
import DisplayProfile from "./DisplayProfile.js";
import DisplayRepos from "./DisplayRepos.js";
import { fetchFollowing, destroyFollow, saveFollow } from "./api";

function App() {

  const [following, setFollowing] = useState([]);
  const [isProfileModalShown, setIsProfileModalShown] = useState(false);

  useEffect(() => {
    Promise.all([fetchFollowing()]).then((following) => {
      setFollowing(following);
    });
  }, []);


  // function editIssue(issueToBeEdited, newTitle, newLabelId) {
  //   const updatedIssues = issues.map((issue) => {
  //     if (issue === issueToBeEdited) {
  //       return {
  //         id: issue.id,
  //         title: newTitle,
  //         label: newLabelId,
  //       };
  //     } else {
  //       return issue;
  //     }
  //   });
  //   setIssues(updatedIssues);
  // }
  
  function follow(title) {
    saveFollow({
      title: title,
    })
    .then((newFollow) => {
      setFollowing(following.concat(newFollow));
    });
  }

  function unfollow(FollowToDelete_id) {
    destroyFollow(FollowToDelete_id).then(() => {
      const filteredFollows = following.filter((follow) => {
        return follow.id !== FollowToDelete_id;
      });

      setFollowing(filteredFollows);
    });
  }
  
  function showProfileModal() {
    setIsProfileModalShown(true);
  }
  function hideProfileModal() {
    setIsProfileModalShown(false);
  }


  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/"><h3><b>ITP404 HW6: React Rendering w/ Modals & JSON Server</b></h3>By Arjun Bamba</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav"></div>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact={true}>
          <DisplayMembers follow={follow} unfollow={unfollow} show={showProfileModal} hide={hideProfileModal} isProfileModalShown={isProfileModalShown}/>
        </Route>
        <Route path="/member/:member" exact={false} >
          <DisplayProfile 
          onClose={hideProfileModal}
          />
        </Route>
        <Route path="/repos/:member" exact={false}>
          <DisplayRepos
          onClose={hideProfileModal}
          />
        </Route>
      </Switch>
    </Router>
    </>
  );
}


export default App;
