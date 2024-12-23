import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import './AssociationDetails.css';

const InstituteClub = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        clubname: "",
        resourcePerson: "",
        yearClass: "",
        studentNum: "",
    });

    const [submittedData, setSubmittedData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData([...submittedData, formData]);
        setFormData({
            date: "",
            event: "",
            clubname: "",
            resourcePerson: "",
            yearClass: "",
            studentNum: "",
        });
    };

    return (
        <div className="container ">
            <h4 className="mt-3 text-primary">Institute Club Activity</h4>
            {/* <div className="p-4 rounded shadow-lg bg-white w-100" style={{ maxWidth: "800px" }}> */}
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Event/Title:</label>
                            <input
                                type="text"
                                name="event"
                                className="form-control"
                                value={formData.event}
                                onChange={handleChange}
                            />
                        </div>
                   
                    
                        <div className="form-group col-md-3 mb-3">
                            <label>Club Name:</label>
                            <input
                                type="text"
                                name="clubname"
                                className="form-control"
                                value={formData.clubname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Resource Person:</label>
                            <input
                                type="text"
                                name="resourcePerson"
                                className="form-control"
                                value={formData.resourcePerson}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                            <label>Year/Class:</label>
                            <input
                                type="text"
                                name="yearClass"
                                className="form-control"
                                value={formData.yearClass}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>No. of Students Benefited:</label>
                            <input
                                type="text"
                                name="studentNum"
                                className="form-control"
                                value={formData.studentNum}
                                onChange={handleChange}
                            />
                        </div>

                    
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo 1:</label>
                            <input
                                type="file"
                                id="imageInput1"
                                name="image1"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo 2:</label>
                            <input
                                type="file"
                                id="imageInput2"
                                name="image2"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                            <label>Event Name:</label>
                            <input
                                type="text"
                                name="resourcePerson"
                                className="form-control"
                                value={formData.resourcePerson}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-success"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        
    );
};

export default InstituteClub;
