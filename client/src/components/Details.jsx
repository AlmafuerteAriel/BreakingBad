import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions";
import { useEffect } from 'react';

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id))
  }, [dispatch])

  const character = useSelector((state) => state.details);

  return(
    <div>
      {
        character.length?
          <div>
            <h1>{character[0].name}</h1>
            <img src={character[0].img} alt={character[0].name} />
            <h3>Nickname: {character[0].nickname}</h3>
            <h3>Birthday: {character[0].birthday}</h3>
            <h3>Status: {character[0].status}</h3>
            <h3>Occupations: </h3>
            <ul>
              {!character[0].createdInDb? character[0].occupation + ' ' : character[0].occupations.map((o) => o.name + ' ')}
              {/* {character[0].occupations.map((o) => <li>{o}</li>)} */}
            </ul>
          </div>
        : <p>Loading...</p>
      }

      <Link to = '/home'>
        <button>Home</button>
      </Link>



    </div>
  )
}