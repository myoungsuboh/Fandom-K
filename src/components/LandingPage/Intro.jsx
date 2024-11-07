import React from 'react';

function Intro({title, subtitle, frontImage, backImage, featureName}) {
  return (
    <div className="intro-container">
      <div className={`intro-titles intro-titles-${featureName}`}>
        <div className="intro-title">{title}</div>
        <div className="intro-subtitle">{subtitle}</div>
      </div>
      <img src={frontImage} className="intro-front-img" alt={`${title} 서비스 이미지`} />
      <img src={backImage} className="intro-back-img" alt={`${title} 서비스 이미지`} />
      <div className="intro-gradient" />
    </div>
  );
}

export default Intro;
