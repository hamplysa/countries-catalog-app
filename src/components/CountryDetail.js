import React, {useState, useEffect} from "react";

function CountryDetail({ setOpenModal, countryCode }) {

    const [country, setCountry] = useState([]);

    useEffect(() => {
        getOneCountry();
    }, [countryCode]);

    const getOneCountry = async() => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const data = await res.json();
            setCountry(data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">

                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-50"
                    onClick={() => setOpenModal(false)}
                ></div>

                <div className="flex items-center min-h-screen">
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">

                            {country.map((item) => (

                                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                                        

                                    <div className="aspect-[1.5]">
                                        <img src={item.flags.png} className="w-full h-full" alt="country flag" />
                                    </div>

                                    <h3 className="text-lg font-bold leading-6 text-red-500 text-1xl lg:text-2xl mt-4">{item.name.official}</h3>

                                    <div className="mt-2">
                                        <div><span className="font-medium">CCA2:</span> {item.cca2}</div>
                                        <div><span className="font-medium">CCA3:</span> {item.ccn3}</div>
                                        <div><span className="font-medium"> Native Country Name: </span>   
                                            <ul className="flex flex-wrap items-start justify-start gap-2">                                  
                                            {Object.values(item.name.nativeName).map(({official, common}) => (
                                                <>
                                                    <li 
                                                        className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                                                    >
                                                        {official}
                                                    </li>
                                                    <li 
                                                        className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                                                    >
                                                        {common}
                                                    </li>
                                                </>
                                            ))}                  
                                            </ul>    
                                        </div>
                                        <div><span className="font-medium">Alternative Country Name: </span>
                                            { item.altSpellings &&
                                                <>                                           
                                                {item.altSpellings.map((item, index) => {
                                                    console.log(item, index);
                                                    return (
                                                        <span>{ (index ? ', ' : '') + item }</span>

                                                    )
                                                })}
                                                </>                            
                                            }
                                        </div>
                                        {item.idd.root && <div><span className="font-medium">IDD Root:</span> {item.idd.root}</div>}
                                        {item.idd.suffixes && <div><span className="font-medium">IDD Suffixes:</span> {item.idd.suffixes}</div>}
                                    </div>

                                    <div className="items-center gap-2 mt-3 sm:flex">
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2 hover:bg-blue-900"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>

                                </div>
                            ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}    

export default CountryDetail;