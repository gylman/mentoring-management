import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Home<Link to="/about">Go to about page</Link>
    </div>
  );
}

export default Home;
