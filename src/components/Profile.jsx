import React from 'react'
// import Navigationvar from './Navigationvar'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
// import Logo from "../Assets/Logo.svg";
import axios from 'axios';
import Header from './Header';

export default function PatientDetails() {
    const [patientData, setPatientData] = useState()
    // const [patientId, setPatientId] = useState(props.id);
    const [reportsDate, setReportsDate] = useState(null)
    const [isOpen, setIsOPen] = useState(false)
    const [openResult, setOpenResult] = useState(false);
    const [isValid, setIsValid] = useState(null);

    const { id } = useParams();
    // const [file, setFile] = useState
    const handleFileClick = async (file) => {
        navigate(`/report/${file}`)
      };
    
    

    async function GetPatient() {
        console.log('inside get patient')
        const response = await axios.get(`http://localhost:3001/en/getpatient/${id}`);
        console.log(response.data)
        console.log(response.data.reportList)
        setPatientData(response.data);
    }

    async function getDates() {
        console.log("hi")
        const response = await axios.get(`http://localhost:3001/en/getdates/${id}`);
        console.log(response.data)
        setReportsDate(response.data)
    }

    useEffect(() => {
        GetPatient();
        // getDates();
    }, [id]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);

        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    // const handlePatient = async (id) => {
    //     try {

    //         navigate(/doctoranalysis, { state: { id: id, pid: patientId, patientData: patientData } })


    //     }
    //     catch (error) {

    //     }
    // }

    const handleFile = async (event) => {
        setIsOPen(true);
        const selectedFile = event.target.files[0];


        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const fileData = reader.result.split(',')[1]; // Get base64-encoded file data
                const filename = event.target.value.replace("C:\\fakepath\\", "");

                try {
                    console.log("hi");
                    const reponse = await axios.post('http://localhost:3001/en/uploadpdf', { file: fileData, filename: filename, patientId: id, name: patientData.name });
                    if (reponse.data.data === false) {

                        setIsOPen(false);
                        setIsValid(true);
                        setOpenResult(true);
                    }
                    else {

                        setIsOPen(false);
                        setIsValid(false);
                        setOpenResult(true);
                    }

                } catch (error) {
                    console.log("Error uploading details:", error);
                    setIsOPen(false);
                    alert('File size too large or other issues.');
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.log("No input file");
        }
    };


    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };


    return (

        <div>
           <Header/>
            <div className="details">
                <header className="details-header">
                    <h1>Patient Details</h1>
                </header>
                <div>
                    <button onClick={handleBack}>
                        Back
                    </button>
                </div>
                <main class="details-main">
                    {patientData ? (
                        <section className="d-patientData-details">
                            <h2 className="d-h2">Patient Information</h2>
                            <p className="d-p"><strong>Id:</strong>{patientData._id}</p>
                            <p className="d-p"><strong>Name:</strong> {patientData.name}</p>
                            <p className="d-p"><strong>Phone Number:</strong> {patientData.phoneNumber}</p>
                            <p className="d-p"><strong>Date of Birth:</strong> {formatDate(patientData.DOB)}</p>
                            <p className="d-p"><strong>Gender:</strong> {patientData.gender}</p>
                            <p className="d-p"><strong>Blood group:</strong> {patientData.bloodGroup}</p>
                            <p className="d-p"><strong>Chronics:</strong>{patientData.chronics.map((condition, index) => (
                                <span key={index} >
                                    {` ${condition},`}
                                </span>
                            ))}</p>
                        </section>
                    ) : (
                        <p>Loading patient details...</p>
                    )}
                    {/* <section className="d-predicted-risks">
                        <h2 class="d-h2">Predicted Risks</h2>
                        <ul class="d-ul"> */}
                    {/* {patientData.predictedRisks.map((risk, index) => (
                            <li key={index}>{risk}</li>
                        ))} */}
                    {/* </ul>
                    </section>
                    <section className="d-recommended-treatment">
                        <h2 class="d-h2">Recommended Treatment</h2>
                        <ul class="d-ul"> */}
                    {/* {patientData.recommendedTreatment.map((treatment, index) => (
                            <li key={index}>{treatment}</li>
                        ))} */}
                    {/* </ul>
                    </section> */}





                    <div >
                       
                        <label htmlFor="file-upload">
                            Upload Reports
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFile}
                        />
                         <h2 >
                            Report History
                        </h2>
                    </div>

                    {/* <div>
                        {patientData.reportsList && patientData.reportsList.map((file, index) => (
                            <div key={index} className="file-item" style={{
                                backgroundColor: '#e9ecef',
                                color: '#495057',
                                padding: '8px',
                                borderRadius: '5px',
                                margin: '8px 0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            //   onClick={() => handleFileClick(file)}
                            >
                                <i className="fas fa-file-alt" style={{ fontSize: '20px', color: '#e74c3c', marginRight: '10px' }} />
                                <p>File ID: {file}</p>
                            </div>
                        ))}
                    </div> */}
                    <div>
                        {patientData?.reportsList && patientData.reportsList.length > 0 ? (
                            patientData.reportsList.map((file, index) => (
                                <div key={index} className="file-item" style={{
                                    backgroundColor: '#e9ecef',
                                    color: '#495057',
                                    padding: '8px',
                                    borderRadius: '5px',
                                    margin: '8px 0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}onClick={() => handleFileClick(file)}>
                                    <i className="fas fa-file-alt" style={{ fontSize: '20px', color: '#e74c3c', marginRight: '10px' }} />
                                    <p>File ID: {file}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reports found.</p>
                        )}
                    </div>







                </main>
            </div>
      </div>
)
}
