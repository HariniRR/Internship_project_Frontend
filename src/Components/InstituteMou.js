import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstituteMou = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        companyname: "",
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
            companyname: "",
            resourcePerson: "",
            yearClass: "",
            studentNum: "",
        });
    };

    return (
        <div className="container">
            <h4 className="mt-3 mb-4 text-primary"> Institute MoU Details</h4>
            {/* <div className="p-4 rounded shadow-lg bg-light w-100" style={{ maxWidth: "800px" }}> */}
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        {/* <div className="form-group col-md-6"> */}
                        <div className="form-group col-md-3 mb-3">
                            <label className="form-label">Department:</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    <div className="form-group col-md-3 mb-3">
                            <label className="form-label">Company Name & Address:</label>
                            <input
                                type="text"
                                name="companyname"
                                className="form-control"
                                value={formData.companyname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label className="form-label">Resource Person:</label>
                            <input
                                type="text"
                                name="resourcePerson"
                                className="form-control"
                                value={formData.resourcePerson}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label className="form-label">Date:</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
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
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    );
};

export default InstituteMou;
