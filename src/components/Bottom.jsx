import React from "react";
import { HoriAd } from "./Adbanner";

const Bottom = ({ moviedata }) => {
  return (
    <section className="watch-section bottom-section">
      <div className="bottom-layout">
        <div className="bottom-column">
          <h2 className="section-title">Trailer</h2>
          <iframe
            className="watch-trailer"
            src={moviedata?.trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <HoriAd />
        </div>
        <div className="bottom-column">
          <h2 className="section-title">Reviews</h2>
          <div className="review-list">
            {moviedata?.reviews.length ? moviedata.reviews.map((e) => (
                <article className="review-card" key={`${e?.author}-${e?.created_at}`}>
                  <div className="review-header">
                    <strong>
                    {e?.author}{" "}
                    </strong>
                    <span className="review-date">
                      {e?.created_at.split("T")[0]}
                    </span>
                  </div>

                  <p className="review-content">
                    {e?.content.slice(0, 500)}...
                  </p>
                </article>
              )) : (
                <p className="ui-empty">No reviews available.</p>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bottom;
