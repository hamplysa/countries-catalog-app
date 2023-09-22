import React, {useState, useEffect} from 'react';
import CountryCard from './CountryCard';


const sorts = [
    "ascending",
    "descending",
];

function Country(){

    const [countries, setCountries] = useState([]);
    const [data, setData] = useState([]); 
    const [data2, setData2] = useState([]);   
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [sortType, setSortType] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    
    useEffect(() => {
        if(isSearch === true && sortType !== ""){
            sortData(countries);
        }else if (isSearch === true && sortType === ""){
            sortData(data2);
        }else{
            getCountries();
        }       
    }, [sortType]);


    console.log(countries.length);

    const getCountries = async() => {
        try{
            const res = await fetch("https://restcountries.com/v3.1/all");
            const data = await res.json();
            setIsLoaded(true);
            setIsSearch(false);
            // setCountries(data);
            sortData(data);
            setData(data);
        }catch(error){
            console.error(error);
        }
    }

    const sortData = (data) => {
        let sortedData;
        if (sortType === 'descending') {
            sortedData = [...data].sort((a, b) => {
            return b.name.official.localeCompare(a.name.official);
            });
        } else if (sortType === 'ascending') {
            sortedData = [...data].sort((a, b) => {
            return a.name.official.localeCompare(b.name.official);
            });
        } else {
            // return data;
            sortedData = data;
        }
        // setData(sortedData);
        setCountries(sortedData);
    }


    const handleChangeInput = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);  
        setIsSearch(true);
        const result = data.filter((x) =>
            x?.name?.common
              ?.toLowerCase()
              ?.includes(e?.target?.value?.toLowerCase())
        );
        setData2(result);      
        setCountries(result);

      };

console.log(countries);

    return (
        <>
            {!countries ? 
                <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">Loading...</h1>
                : (
                <main>
                    <div className="container mx-auto sm:px-12">

                        <header>
                            <div className="py-4 dark:text-white">
                                <div className="text-4xl font-bold mt-4 inline-block dark:text-white"> Countries Catalog </div>

                                <div className="relative mt-6 ">                               
                                    <form  autoComplete='off'>
                                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none dark:text-black">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="search"
                                            id="search"
                                            className="block p-4 pl-10 w-full rounded border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none shadow dark:text-black transition-all duration-200" 
                                            placeholder="Search for country by name"
                                            value={searchInput}
                                            // onChange={(e) => setSearchInput(e.target.value)}
                                            onChange={handleChangeInput}
                                            required
                                            />                                        
                                    </form>
                                
                                    <div className="text-red-400 mt-2.5 absolute"></div>
                                </div>

                                <div className="mt-4 dark:text-white">Sort by country name</div>

                                <div className='flex mt-2'>
                                    <div className="flex gap-x-2 flex-wrap">

                                        <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            // defaultValue="default"
                                            value={sortType}
                                            onChange={(e) => setSortType(e.target.value)}
                                        >
                                            <option disabled value="">Sort by</option>
                                            {sorts.map(sort => (
                                                <option key={sort} value={sort}>{sort.charAt(0).toUpperCase() + sort.slice(1)}</option>
                                            ))}
                                        </select>

                                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                                            onClick={() => setSortType("")}>
                                            Reset
                                        </button>
                                        
                                    </div>
                                

    
                                </div> 

                                
                            </div>
                        </header>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-6 my-4 md:mb-12">
                            {isLoaded ? (   
                                countries.map((country) => (
                                    <CountryCard key={country.name.common} {...country} />
                                ))
                            ) : (
                                <div></div>
                            )} 
                        </div>

                    </div>
                </main>
            )}
        </>
    );
}

export default Country;