import React, { useState, useEffect } from "react";
import axios from "axios";

const Tour = () => {
    const [formData, setFormData] = useState({
        date: "",
        visit: "",
        namePlace: "",
        yearClass: "",
        benefited: "",
    });

    const [submittedData, setSubmittedData] = useState([]);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getTour");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date:new Date(formData.date),
        };
        try {
            // Make POST request to submit form data
            const response = await axios.post("http://localhost:3001/api/newTour ", formattedData);
                
            console.log(response.data);
              // Update submittedData with the new entry
            setSubmittedData([...submittedData, response.data]);
            // Reset form data
            setFormData({
                date: "",
                visit: "",
                namePlace: "",
                yearClass: "",
                benefited: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Student Industrial Visit/Educational Tour Details</h4>
            <form onSubmit={handleSubmit}>
            {/* <h5 className="mt-3">Participation and Achievements</h5> */}
                <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date:</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Industrial Visit/Tour:</label>
                            <input type="text" name="visit" className="form-control" value={formData.visit} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Industry Name/Place Visited:</label>
                            <input type="text" name="namePlace" className="form-control" value={formData.namePlace} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Year/Class:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>No.Of Students Benefited:</label>
                            <input type="text" name="benefited" className="form-control" value={formData.benefited} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo1/Certificate:</label>
                            <input type="file" id="imageInput1" name="image1" accept="image/*"  />
                        </div>
                        
                     
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo2/Certificate:</label>
                            <input type="file" id="imageInput2" name="image2" accept="image/*"  />
                        </div>
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
              
            </form>
            <h4 className="mt-3">Submitted Data</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Industrial Visit/Tour</th>
                        <th>Industry Name/Place Visited</th>
                        <th>Year/Class</th>
                        <th>No.of Students Benefited</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.visit}</td>
                            <td>{data.namePlace}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.benefited}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
       </div>
    );
};

export default Tour;