import React, { memo } from 'react';
import SearchStyled from 'components/Search/style';
import { BsSearch } from "react-icons/bs";

const Search = memo((props: { onSearch: (query: string) => void }) => <SearchStyled>
    <div className='search-input-container'>
        <div className='search-input-with-dropdown'>
            <div className='left-side-wrapper'>
                <form className='search-input-form'>
                    <BsSearch className='icon fill-current search-icon'/>
                    <input
                        placeholder='Search...'
                        className='search-input'
                        type='text'
                        onChange={(event) => props.onSearch(event.target.value)}
                    />
                </form>
            </div>
        </div>
    </div>
</SearchStyled>);

export default Search;
