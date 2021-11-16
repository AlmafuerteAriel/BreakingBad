import React from "react";

export default function Pagination({charactersPerPage, allCharacters, pagination, currentPage}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }
  return(
    <nav>
      <ul>
        { pageNumbers?.map(number => (
          <li 
            style={number === currentPage ? {backgroundColor: '#3d4a57'} : {}}
            key={ number }>
            <a onClick={ () => pagination(number) }>{ number }</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}