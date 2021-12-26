function CheckAuth(setAuth, setData = null) {
  if (localStorage.getItem("token") === null) {
    window.location.replace("/auth/login");
  } else {
    fetch("/auth/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAuth(true);
        setData && setData(data);
      });
  }
}

export default CheckAuth;
