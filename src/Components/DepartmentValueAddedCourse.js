import React, { useState, useEffect } from "react";
import axios from "axios";

const ValueAddedCourse = () => {
    const [formData, setFormData] = useState({
        date: "",
        yearclass: "",
        nameregno: "",
        vacname: "",
        organizedby: "",
        grade: "",
        title: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getValueAddedCourse");
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
        console.log("Form data before submission:", formData);
        const formattedData = {
            ...formData,
            date:new Date(formData.date),
            
        };

        try {
            const response = await axios.post("http://localhost:3001/api/newValueAddedCourse", formattedData );

            console.log(response.data);
            setSubmittedData([...submittedData, response.data]);
            setFormData({
                date: "",
                yearclass: "",
                nameregno: "",
                vacname: "",
                organizedby: "",
                grade: "",
                title: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-center">Value Added Course</h4>
            <form onSubmit={handleSubmit} >
                <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                        <label>Date:</label>
                        <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Year/Class:</label>
                        <input type="text" name="yearclass" className="form-control" value={formData.yearclass} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Student Name & Register No:</label>
                        <input type="text" name="nameregno" className="form-control" value={formData.nameregno} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>VAC Name:</label>
                        <input type="text" name="vacname" className="form-control" value={formData.vacname} onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                        <label>Organized By:</label>
                        <input type="text" name="organizedby" className="form-control" value={formData.organizedby} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Completed Status & Grade:</label>
                        <input type="text" name="grade" className="form-control" value={formData.grade} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>VAC Title:</label>
                        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo1/Certificate:</label>
                        <input type="file" name="image1" accept="image/*" className="form-control" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo2/Certificate:</label>
                        <input type="file" name="image2" accept="image/*" className="form-control"  />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-success" value="Submit" />
                </div>
            </form>

            <h4 className="mt-3">Submitted Data</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Year/Class</th>
                        <th>Student Name & Register No</th>
                        <th>VAC Name</th>
                        <th>Organized By</th>
                        <th>Completed Status & Grade</th>
                        <th>VAC Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.yearclass}</td>
                            <td>{data.nameregno}</td>
                            <td>{data.vacname}</td>
                            <td>{data.organizedby}</td>
                            <td>{data.grade}</td>
                            <td>{data.title}</td>
                            <td>
                                <button className="btn btn-info mr-2">View</button>
                                <button className="btn btn-primary">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ValueAddedCourse;
