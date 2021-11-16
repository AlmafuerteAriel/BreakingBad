import React from "react";

export default function Card({ name, image, nickname }) {
  return(
    <div>
      <h3>{ name }</h3>
      <h5>{ nickname }</h5>
      <img src = { image } alt = { image } />
    </div>
  )
}