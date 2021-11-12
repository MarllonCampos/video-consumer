import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ListVideos />
      <Switch>
        <Route path="/videos/:slug" component={ShowVideo} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

function ListVideos() {
  interface IVideos {
    id: string;
    name: string;
  }

  const [loading, setLoading] = useState<Boolean>(true);
  const [videos, setVideos] = useState<Array<IVideos>>([]);
  const fetchAllVideos = async () => {
    const response = await fetch("http://localhost:3300");
    const data = await response.json();
    setVideos(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!loading &&
        videos.map(({ name, id }) => (
          <div key={id} style={{ marginBottom: "0.3em" }}>
            Nome:{" "}
            <a href={`/videos/${name.split(".")[0]}`}>
              {name}
            </a>
          </div>
        ))}
    </div>
  );
}

function ShowVideo() {
  interface IParams {
    slug: string;
  }
  const [loading, setLoading] = useState<Boolean>(true);
  const [srcAttribute, setSrcAttribute] = useState("");
  const { slug } = useParams<IParams>();

  const fetchSpecificVideo = async () => {
    const response = await fetch(
      `http://localhost:3300/videos/videos/${slug}.mp4`,
      {
        headers: {
          "content-type": "video/mp4",
        },
      }
    );
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    setSrcAttribute(blobUrl);
    setLoading(false);
  };

  useEffect(() => {
    fetchSpecificVideo();
  }, []);
  return (
    <>
      {!loading && (
        <video
          autoPlay
          loop
          controls
          muted
          preload="auto"
          style={{
            maxWidth: 320,
            maxHeight: 480,
            margin: "1em auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <source src={srcAttribute} type="video/mp4" />
        </video>
      )}
    </>
  );
}
