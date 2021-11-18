import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postCharacter, getOccupations } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
  const errors = {};
  if(!input.name) {
    errors.name = 'Name is required!';
  } else if(!input.nickname) {
    errors.nickname = 'Nickname is required!';
  } else if(!input.birthday) {
    errors.birthday = 'Birthday is required!';
  } else if(!input.status) {
    errors.status = 'Status is required!';
  } else if(!input.occupation.length) {
    errors.status = 'Occupation is required!';
  }
  return errors;
}

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const occupations = useSelector((state) => state.occupations);
  
  const [ errors, setErrors ] = useState({});

  const [ input, setInput ] = useState({
    name: '',
    nickname: '',
    birthday: '',
    img: '',
    status: '',
    occupation: []
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    //console.log((input));
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  //Manejo de radio:
  function handleRadio(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        status: e.target.value
      })
    }
    console.log((input));
      //setErrors(validate({
      //...input,
      //season: e.target.value
    //}))
  }

  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value]
    })
    console.log((input));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postCharacter(input));
    alert('Character created!');
    setInput({
      name: '',
      nickname: '',
      birthday: '',
      img: '',
      status: '',
      occupation: []
    })
    history.push('/home');
  }

  function handelDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter((o) => o !== el)
    })

  }

  useEffect(() => {
    dispatch(getOccupations());
  }, []);

  return(
    <div>
      <Link to='/home'><button>Home</button></Link>
      <h1>Create new character</h1>
      
      <form onSubmit={(e) => handleSubmit(e)} >
        
        <div>
          <label>Name: </label>
          <input 
            type='text' 
            name='name'
            placeholder='Name'
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name ? <p>{errors.name}</p> : <p></p>}
        </div>
        
        <div>
          <label>NickName: </label>
          <input 
            type='text' 
            name='nickname'
            placeholder='NickName'
            value={input.nickname}
            onChange={(e) => handleChange(e)}
          />
          {errors.nickname ? <p>{errors.nickname}</p> : <p></p>}
        </div>
        
        <div>
          <label>Birthday: </label>
          <input 
            type='text' 
            name='birthday'
            placeholder='dd/mm/yyyy'
            value={input.birthday}
            onChange={(e) => handleChange(e)}
          />
          {errors.birthday ? <p>{errors.birthday}</p> : <p></p>}
        </div>
        
        <div>
          <label>Image: </label>
          <input 
            type='text' 
            name='img'
            placeholder='Enter url'
            value={input.img}
            onChange={(e) => handleChange(e)}
            />
        </div>

        <label>Status: </label>
        <div>
          <label>
            <input 
              type='radio'
              name='Status'
              value='Alive'
              onChange={(e) => handleRadio(e)}
          />Alive</label>
          <label>
            <input 
              type='radio'
              name='Status'
              value='Deceased'
              onChange={(e) => handleRadio(e)}
          />Deceased</label>
          <label>
            <input 
              type='radio'
              name='Status'
              value='Presumed dead'
              onChange={(e) => handleRadio(e)}
          />Presumed dead</label>
          <label>
            <input 
              type='radio'
              name='Status'
              value='Unknown'
              onChange={(e) => handleRadio(e)}
          />Unknown</label>
          {/* {errors.status ? <p>{errors.status}</p> : <p></p>} */}
        </div>
        
        <label>Occupation</label>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            {occupations.map((o) => (
              <option value={o.name}>{o.name}</option>
            ))}
          </select>
          {errors.occupation ? <p>{errors.occupation}</p> : <p></p>}
        </div>

        <div>
          <button type='submit'>Create Character</button>
        </div>

      </form>

      <ul>
        {input.occupation.map((o) =>
          <li>
            {o} <button onClick={() => handelDelete(o)}>X</button>
          </li>)}
      </ul>
    
    </div>
  )
}