import React, { useState, useEffect } from "react";
import axios from "axios";

const Institute_ActivityStudent = () => {
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        resourcePerson: "",
        yearClass: "",
        numStudent: "",
        // image1: null,
        // image2: null,
        professionalSociety: "",
    });

    const [submittedData, setSubmittedData] = useState([]);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getInstituteActivityStudent");
                setSubmittedData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleFileChange = (e) => {
    //     const { name, files } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: files[0], // Store the first selected file
    //     });
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date:new Date(formData.date),
            numStudent:Number(formData.numStudent), 
        };
        try {
            // Make POST request to submit form data
            const response = await axios.post("http://localhost:3001/api/newInstituteActivityStudent", formattedData); 
            console.log(response.data);
            // Update submittedData with the new entry
            setSubmittedData([...submittedData, response.data]);
            // Reset form data
            setFormData({
                date: "",
                event: "",
                resourcePerson: "",
                yearClass: "",
                numStudent: "",
                // image1: null,
                // image2: null,
                professionalSociety: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Professional Societies Activities for Students</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>Date:</label>
                        <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Event/Title:</label>
                        <input type="text" name="event" className="form-control" value={formData.event} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Resource Person:</label>
                        <input type="text" name="resourcePerson" className="form-control" value={formData.resourcePerson} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Year/Class:</label>
                        <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>No. of Students Benefited:</label>
                        <input type="number" name="numStudent" className="form-control" value={formData.numStudent} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo1:</label>
                        <input type="file" id="imageInput1" name="image1" accept="image/*"  />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo2:</label>
                        <input type="file" id="imageInput2" name="image2" accept="image/*" />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Professional Society Name:</label>
                        <input type="text" name="professionalSociety" className="form-control" value={formData.professionalSociety} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </div>
            </form>

            <h4 className="mt-3">Submitted Data</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event/Title</th>
                        <th>Resource Person</th>
                        <th>Year/Class</th>
                        <th>No. of Students Benefited</th>
                        <th>Professional Society</th>
                        {/* <th>Actions</th> */}
                        {/* <th>Photos</th> */}
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.event}</td>
                            <td>{data.resourcePerson}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.numStudent}</td>
                            <td>{data.professionalSociety}</td>
                            {/* <td>
                                <button  className="btn btn-info" onClick={() => handleEdit(data)}>Edit</button>
                            </td> */}
                            {/* <td>
                                <img src={data.image1} alt="Photo1" style={{ width: "50px" }} />
                                <img src={data.image2} alt="Photo2" style={{ width: "50px" }} />
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Institute_ActivityStudent;
