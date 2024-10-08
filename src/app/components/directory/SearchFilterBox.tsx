import { Dispatch, SetStateAction } from 'react';
import style from './directory.module.css';

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function SearchFilterBox({ setSearchValue }: Props) {
  return (
    <div>
      {/* Search Bar */}
      <input
        className={`form-control ${style.searchBar}`}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setSearchValue(e.currentTarget.value.toLowerCase())}
      />
    </div>
  );
}
