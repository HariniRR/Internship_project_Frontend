import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mou = () => {
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
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getMouData");
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
    
    const handleEdit = (data) => {
        setFormData({
            date: new Date(data.date).toISOString().split('T')[0], // Format date for input
            event: data.event,
            companyname: data.companyname,
            resourcePerson: data.resourcePerson,
            yearClass: data.yearClass,
            studentNum: data.studentNum,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date: new Date(formData.date),
            studentNum: Number(formData.studentNum),
        };
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateMouData/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newMouData ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }

            setFormData({
                date: "",
                event: "",
                companyname: "",
                resourcePerson: "",
                yearClass: "",
                studentNum: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 mb-4 text-primary">MoU/Centre of Excellence Activity</h4>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
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
                    <div className="form-group col-md-3 mb-3">
                        <label className="form-label">Event/Title:</label>
                        <input
                            type="text"
                            name="event"
                            className="form-control"
                            value={formData.event}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label className="form-label">Company Name:</label>
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
                </div>
                <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                        <label className="form-label">Year/Class:</label>
                        <input
                            type="text"
                            name="yearClass"
                            className="form-control"
                            value={formData.yearClass}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label className="form-label">No. of Students:</label>
                        <input
                            type="number"
                            name="studentNum"
                            className="form-control"
                            value={formData.studentNum}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>

            {/* Table to display submitted data */}
            <h4 className="mt-3">Submitted Data</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event/Title</th>
                        <th>Company Name</th>
                        <th>Resource Person</th>
                        <th>Year/Class</th>
                        <th>No. of Students</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.event}</td>
                            <td>{data.companyname}</td>
                            <td>{data.resourcePerson}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.studentNum}</td>
                            <td> 
                            <button  className="btn btn-info" onClick={() => handleEdit(data)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Mou;
