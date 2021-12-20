import React from "react";
import { Link } from "react-router-dom";

function HomeUI() {
  return (
    <div>
      <h1>홈 화면</h1>
      <Link to="/posts">포스트 목록으로 이동</Link>
    </div>
  );
}

export default HomeUI;
