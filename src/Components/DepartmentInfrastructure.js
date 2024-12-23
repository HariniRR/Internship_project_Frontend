import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Infrastructure = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        infrastructure: "",
        remarks: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getInfrastructure"); // Corrected endpoint
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
            date: new Date(data.date).toISOString().split('T')[0], 
            infrastructure: data.infrastructure,
            remarks: data.remarks,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data before submission:", formData);
        const formattedData = {
            ...formData,
            date: new Date(formData.date),
        };
        
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateInfrastructure/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); 
            } else {
                const response = await axios.post("http://localhost:3001/api/newInfrastructure ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }
            setFormData({
                date: "",
                infrastructure: "",
                remarks: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 mb-4 text-primary">Department Consultancy Activities</h4>
            <h5>Laboratory Enhancement & Other Related Details</h5>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="form-group col-md-6">
                        <label className="form-label">Date:</label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">Name of the Infrastructure Development:</label>
                        <input
                            type="text"
                            name="infrastructure"
                            className="form-control"
                            value={formData.infrastructure}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="form-group col-md-12">
                        <label className="form-label">Remarks:</label>
                        <input
                            type="text"
                            name="remarks"
                            className="form-control"
                            value={formData.remarks}
                            onChange={handleChange}
                            required
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
                        <th>Name of the Infrastructure Development</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.infrastructure}</td>
                            <td>{data.remarks}</td>
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

export default Infrastructure;
