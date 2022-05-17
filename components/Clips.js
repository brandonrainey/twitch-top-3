import React from "react";
import Image from "next/image";

export default function Clips({ clips, staticData2 }) {
  return (
    <div className="clipsContainer">
      {clips
        ? clips.data.map((item, index) => (
            <div className={`clipWrapper ${index % 2 != 0 ? 'odd' : null}`} key={item.id}>
              <p className="clipTitle">{item.title}</p>
              <p>Views: {item.view_count.toLocaleString()}</p>
              <a href={item.url} className="clipThumbnail">
                <div className="imageWrapper">
                  <img
                  src={`${item.thumbnail_url ? item.thumbnail_url : '/errorImage.png'}`}
                  height={200}
                  width={360}
                  layout="responsive"
                  className="clipImage"
                  priority='true'
                />
                </div>
                
              </a>
            </div>
          ))
        : staticData2.data.map((item) => (
            <div className="clipWrapper" key={item.id}>
              <p className="clipTitle">{item.title}</p>
              <p>Views: {item.view_count.toLocaleString()}</p>
              <a href={item.url} className="clipThumbnail">
                <div className="imageWrapper">
                  <img
                  src={`${item.thumbnail_url ? item.thumbnail_url : '/errorImage.png'}`}
                  height={200}
                  width={360}
                  layout="responsive"
                  className="clipImage"
                  priority='true'
                />
                </div>
                
              </a>
            </div>
          ))}
    </div>
  );
}
