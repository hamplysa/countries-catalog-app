import React, {useState, useEffect} from 'react';

function Country(){

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async() => {
        try{
            const res = await fetch("https://restcountries.com/v3.1/all");
            const data = await res.json();
            setCountries(data);
        }catch(error){
            console.error(error);
        }
    }


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
                            </div>
                        </header>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-6 my-4 md:mb-12">
                            <ul>
                                {countries.map((country) => (
                                    <li key={country.cca2}>{country.name.official}</li>                            
                                ))}
                            </ul>
                        </div>

                    </div>
                </main>
            )}
        </>
    );
}

export default Country;