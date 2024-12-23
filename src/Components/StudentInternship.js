import React, { useState, useEffect } from "react";
import axios from "axios";

const Internship = () => {
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        studentname: "",
        yearClass: "",
        completed: "",
        internshipDate: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getInternship");
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
            title: data.title,
            studentname: data.studentname,
            yearClass: data.yearClass,
            completed: data.completed,
            internshipDate: data.internshipDate,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date: new Date(formData.date), 
           
        };
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateInternship/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newInternship", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }

            setFormData({
                date: "",
                title: "",
                studentname: "",
                yearClass: "",
                completed: "",
                internship: "",
                // image1: null,
                // image2: null,
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Student Internship/Inplant Training Details</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>Date (From-To):</label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Student Name & Register NO:</label>
                        <input
                            type="text"
                            name="studentname"
                            className="form-control"
                            value={formData.studentname}
                            onChange={handleChange}
                        />
                    </div>
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
                </div>

                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>Register/Completed:</label>
                        <input
                            type="text"
                            name="completed"
                            className="form-control"
                            value={formData.completed}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Internship/Inplant Training Date & Place:</label>
                        <input
                            type="text"
                            name="internshipDate"
                            className="form-control"
                            value={formData.internshipDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo/Certificate:</label>
                        <input
                            type="file"
                            id="imageInput1"
                            name="image1"
                            accept="image/*"
                        
                        />
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
                        <th>Title</th>
                        <th>Student Name</th>
                        <th>Year/Class</th>
                        <th>Completed</th>
                        <th>Internship</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.title}</td>
                            <td>{data.studentname}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.completed}</td>
                            <td>{data.internshipDate}</td>
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

export default Internship;
