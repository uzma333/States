import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DisplayLocation.module.css"
 
function DisplayLocation(){

    const[countries,setCountries]=useState([]);
    const[states,setState]=useState([]);
    const[cities,setCity]=useState([]);
    const[selectedCountry,setSelectedCountry]=useState("");
    const[selectedState,setSelectedState]=useState("");
    const[selectedCity,setSelectedCity]=useState("");

   
        useEffect(()=>{
          axios.get("https://crio-location-selector.onrender.com/countries")
          .then((response)=>{
            setCountries(response.data)
          })
          .catch((error)=>{
            console.log("Error fetching countries:",error)
          });
            
        },[])

        useEffect(()=>{
            if(selectedCountry){
         axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
         .then((response)=>{
            setState(response.data);
            selectedState("");
            setCity([]);
            setSelectedCity("");

         })
         .catch((error)=>{
            console.log("Error fetching states:",error)
         })
            }
        }, [selectedCountry]);

        useEffect(()=>{
            if(selectedCountry && selectedState){
                axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then((response)=>{
               setCity(response.data);
               setSelectedCity("")
                })
                .catch((error)=>{
                    console.log("Error fetching cities:",error)
                })
            }
        },[selectedCountry,selectedState])
    


 return(
    <div>
        <div className={styles.heading}>
            <h1>Select Location</h1>
        </div>
        <div className={styles.dropdowns}>
            <select value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)} className={styles.dropdown}>
                <option value="" disabled>Select Country</option>

                {countries.map((country)=>(
                <option key={country} value={country}>{country}</option>
                ))}
            </select>
           
            <select value={selectedState} onChange={(e)=>setSelectedState(e.target.value)} disabled={!selectedCountry} className={styles.dropdown}>
                <option value="" disabled>Select States</option>
               {states.map((state)=>(
                <option key={state} value={state}>{state}</option>
               ))}
            </select>

            <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)} disabled={!selectedState} className={styles.dropdown}>
                <option value="" disabled>Select City</option>

                {cities.map((city)=>(
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

        </div>
        {selectedCity &&(
            <p className={styles.result}>
                You selected  <span className={styles.highlight}> {selectedCity},</span>{" "}
                <span className={styles.fade}>
                    
                    {selectedState}, {selectedCountry}
                </span>
            </p>
        )
            
        }
    </div>
  )  
}
export default DisplayLocation;