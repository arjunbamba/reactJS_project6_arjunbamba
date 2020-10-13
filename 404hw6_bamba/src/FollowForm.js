import React, { useState } from "react";

export default function FollowForm({
  name,
  onSubmit,
}) {
  const [title, setTitle] = useState(name);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(title);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" value={name} className="btn btn-primary">
        Follow
      </button>
    </form>
  );
}