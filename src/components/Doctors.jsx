import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
function Doctor(){
    const Navigate=useNavigate();
    const[patientlist, setPatientlist]=useState(null)
    useEffect(()=>{
        const function1 = async() => {
            const response=await axios.get("http://localhost:3001/en/getpatients")
            setPatientlist(response.data);
        }
        function1();
    },[])
    const handleUpload=()=>{
        Navigate('/Upload');
    }
    function formatDate(inputDate){
        const date=new Date(inputDate);
        const day=String(date.getDate()).padStart(2,'0');
        const month= String(date.getMonth()+1).padStart(2,'0');
        const year=date.getFullYear();
        return `${day}/${month}/${year}`
    }
    const handlePatientClick = (id) => {
        Navigate(`/doctorprofile/${id}`);
      };
    
    return(
        <div>
            <Header/>
            <div className='doctorpage'>
            <table>
                <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                </tr>
                </thead>
                <tbody>
                            {patientlist && patientlist.map((data) => (
                                <tr key={data._id} onClick={() => handlePatientClick(data._id)}  >
                                    {/* <th>{data.s_no}</th> */}
                                    <td>{data._id}</td>
                                    <td>{data.name}</td>
                                    {/* <td>{data.email}</td> */}
                                    <td>{data.phone}</td>
                                    <td>{formatDate(data.DOB)}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.bloodGroup}</td>
                                </tr>
                            ))}
                        </tbody>

                
            </table>




            </div>

        </div>
    );
}
export default Doctor;