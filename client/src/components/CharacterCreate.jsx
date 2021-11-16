import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postCharacter, getOccupations } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const occupations = useSelector((state) => state.occupations);

  const [ input, setInput ] = useState({
    name: '',
    nickname: '',
    birthday: '',
    img: '',
    status: '',
    occupation: []
  })

  useEffect(() => {
    dispatch(getOccupations());
  }, []);

  return(
    <div>
      <Link to='/home'><button>Home</button></Link>
      <h1>Create new character</h1>
      <form>
        <div>
          <label>Name: </label>
          <input 
            type='text' 
            name='name'
            placeholder='Name'
            value={input.name} 
          />
        </div>
        <div>
          <label>NickName: </label>
          <input 
            type='text' 
            name='nickname'
            placeholder='NickName'
            value={input.nickname} 
          />
        </div>
        <div>
          <label>Birthday: </label>
          <input 
            type='text' 
            name='birthday'
            placeholder='dd/mm/yyyy'
            value={input.birthday} 
          />
        </div>
        <div>
          <label>Image: </label>
          <input 
            type='text' 
            name='img'
            placeholder='Enter url'
            value={input.img} 
          />
        </div>
      </form>
    </div>
  )
}