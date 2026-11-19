import React from "react";

const WatchSkeleton = () => (
  <div className="watch-skeleton-layout" aria-label="Loading title" aria-busy="true">
    <div>
      <div className="skeleton skeleton-video" />
      <div className="skeleton-copy">
        <div className="movie-skeleton__line" />
        <div className="movie-skeleton__line movie-skeleton__line--short" />
      </div>
    </div>
    <div className="watch-details">
      <div className="details-top">
        <div className="skeleton skeleton-poster" />
        <div className="skeleton-copy">
          <div className="movie-skeleton__line" />
          <div className="movie-skeleton__line movie-skeleton__line--short" />
        </div>
      </div>
      <div className="skeleton-copy">
        <div className="movie-skeleton__line" />
        <div className="movie-skeleton__line" />
        <div className="movie-skeleton__line movie-skeleton__line--short" />
      </div>
    </div>
  </div>
);

export default WatchSkeleton;
