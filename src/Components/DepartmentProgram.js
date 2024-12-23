import React, { useState, useEffect } from "react";
import axios from "axios";

const Program = () => {
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        resourcePerson: "",
        programename: "",
        benefited: "",
        
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getProgram");
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
            resourcePerson: data.resourcePerson,
            programename: data.programename,
            benefited: data.benefited,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form data before submission:", formData);
        const formattedData = {
            ...formData,
            date: new Date(formData.date), 
            numStudent: Number(formData.numStudent), 
        };

        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateProgram/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newProgram ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }

            setFormData({
                date: "",
                event: "",
                resourcePerson: "",
                programename: "",
                benefited: "",
                
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 mb-4 text-primary">Program Organized for Faculty Members</h4>
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
                        <label>Resource Person:</label>
                        <input
                            type="text"
                            name="resourcePerson"
                            className="form-control"
                            value={formData.resourcePerson}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Programme Name:</label>
                        <input
                            type="text"
                            name="programename"
                            className="form-control"
                            value={formData.programename}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="form-group col-md-3 mb-3">
                        <label>Faculty Benefited:</label>
                        <input
                            type="text"
                            name="benefited"
                            className="form-control"
                            value={formData.benefited}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo/Certificate:</label>
                        <input
                            type="file"
                            name="image1"
                            accept="image/*"
                           
                            className="form-control"
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

            <h4 className="mt-3">Submitted Data</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event/Title</th>
                        <th>Resource Person</th>
                        <th>Programme Name</th>
                        <th>Faculty Benefited</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.event}</td>
                            <td>{data.resourcePerson}</td>
                            <td>{data.programename}</td>
                            <td>{data.benefited}</td>
                            <td> <button  className="btn btn-info" onClick={() => handleEdit(data)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Program;
