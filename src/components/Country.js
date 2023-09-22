import React, {useState, useEffect} from 'react';
import CountryCard from './CountryCard';

function Country(){

    const [countries, setCountries] = useState([]);
    const [data, setData] = useState([]);   
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    
    useEffect(() => {
        getCountries();
    }, []);


    console.log(countries.length);

    const getCountries = async() => {
        try{
            const res = await fetch("https://restcountries.com/v3.1/all");
            const data = await res.json();
            setIsLoaded(true);
            setCountries(data);
            setData(data);
        }catch(error){
            console.error(error);
        }
    }


    const handleChangeInput = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setCountries(
          data.filter((x) =>
            x?.name?.common
              ?.toLowerCase()
              ?.includes(e?.target?.value?.toLowerCase())
          )
        );
      };


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