import React, {useState} from 'react';
import CountryDetail from "./CountryDetail";

function CountryCard({ 
    flags, 
    name, 
    cca2, 
    ccn3, 
}){

    const [showModal, setShowModal] = useState(false);
    const [countryName, setCountryName] = useState(null);

    const handleShow = (cca2) => {
        setCountryName(cca2.toLowerCase());
        setShowModal(true);       
    }

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:text-white dark:hover:bg-gray-700 transition-all duration-200">
                <div className='aspect-[1.5] p-4 cursor-pointer'>
                    <img src={flags.png} alt="" className="w-full h-full" />
                </div>
                <div className='p-4'>
                    <h2 className="font-bold text-lg text-gray-900 mb-2 hover:text-red-900 cursor-pointer dark:text-white" onClick={() => handleShow(cca2)}>{name.official}</h2>                    
                    <ul className="flex flex-col items-start justify-start gap-2">
                        <li><span className='font-medium'>CCA2:</span> {cca2}</li>
                        <li><span className='font-medium'>CCA3:</span> {ccn3}</li>                                               
                    </ul>
                </div>                
            </div>

            {showModal && <CountryDetail setOpenModal={setShowModal} countryCode={countryName} />}
        </>
    );
}

export default CountryCard;