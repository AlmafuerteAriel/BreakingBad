import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCharacters,
  filterCharacterByStatus,
  filterCharacterByCreation,
  orderByName
} from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector ((state) => state.allCharacters);
  //Creamos un estado para actualizar renderizado
  const [ order, setOrder ] = useState('');

  // -> Paginado
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ charactersPerPage, setcharactersPerPage ] = useState(6);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // Paginado <-
  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  function handleFilterByStatus(e) {
    dispatch(filterCharacterByStatus(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByCreation(e) {
    dispatch(filterCharacterByCreation(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    //Modificamos el estado para actualizar renderizado
    setOrder(`Ordered ${e.target.value}`);
    e.target.value='default';
  }

  return(
    <div>
      <Link to = '/character'>
        Create character
      </Link>
      <h1>Breaking Bad</h1>
      <button onClick={e => {handleClick(e)}}>Reload characters</button>
      <div>

        <select defaultValue='default' onChange={ (e) => handleSort(e) }>
          <option value='default' disabled='disabled'>Choose order</option>
          <option value='Ascendent'>Ascendent</option>
          <option value='Descendent'>Descendent</option>
        </select>

        <select onChange={ (e) => handleFilterByStatus(e) }>
          <option value='All'>All</option>
          <option value='Alive'>Alive</option>
          <option value='Deceased'>Deceased</option>
          <option value='Presumed dead'>Presumed dead</option>
          <option value='Unknown'>Unknown</option>
        </select>

        <select onChange={ (e) => handleFilterByCreation(e) }>
          <option value='All'>All</option>
          <option value='From Api'>From API</option>
          <option value='Created'>Created</option>
        </select>

        <SearchBar />

        <Pagination
          charactersPerPage = { charactersPerPage }
          allCharacters = { allCharacters.length }
          pagination = { pagination }
          currentPage = { currentPage }
        />
        {
          currentCharacters?.map((c) => {
            return(
            <div>
              <Link to={`/home/${c.id}`}>
                <Card 
                  name={c.name} 
                  image={c.img ? c.img : 'https://www.definicionabc.com/wp-content/uploads/silueta.gif'} 
                  nickname={c.nickname} key={c.id}/>
              </Link>
            </div>
            )
          })
        }

      </div>
    </div>
  )
}