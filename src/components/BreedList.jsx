import React, {useEffect, useState} from 'react';
import  {fetchBreeds} from '../lib/api';


const BreedList = ({dispatchBreedChange}) => {
    const [value, setVal] = useState();
    const [breeds, setBreeds] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setVal(e.target.value);

        if(dispatchBreedChange){
            dispatchBreedChange(e.target.value);
        }
    }

    const handlePageClick = (newPageNumber) => {
        if(newPageNumber < 0 || newPageNumber >= totalPage){
            return;
        }
        setCurrentPage(newPageNumber);
    }


    useEffect(() => {
        (async() => {
           setIsLoading(loadingStatus => !loadingStatus);
           const breedsData = await fetchBreeds(currentPage, 15);
           setBreeds(breedsData.breeds);
           setTotalPage(parseInt(Math.ceil(breedsData.totalBreeds/15),10));
           setIsLoading(loadingStatus => !loadingStatus);
        })()
    }, [currentPage])


    return (
        <>
        {isLoading && (
            <progress className='progress is-medium is-link' max='100'>
              60%
            </progress>
        )}
        {
          !isLoading && (
            <>
              <div className='field breed-list'>
                <div className='control'>
                  {breeds.map(breed => (
                      <label className='radio' key={breed.id}>
                        <input type="radio" name="breed" checked={value === breed.id.toString()} value={breed.id} onChange={handleChange} />
                        {breed.name}
                      </label>
                  ))}
                </div>
              </div>
              <br />
              <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                <span className="pagination-previous" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage <= 0}>
                  Previous
                </span>
                <span href='#' className="pagination-previous" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage + 1 >= totalPage}>
                  Next page
                </span>
              </nav>
            </>
          )
        }
      </>

    );


}

export default BreedList;