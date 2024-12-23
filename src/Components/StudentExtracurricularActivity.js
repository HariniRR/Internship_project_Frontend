import React, { useState, useEffect } from "react";
import axios from "axios";

const ExtracurricularActivity = () => {
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        resourcePerson: "",
        yearClass: "",
        studentNameRegNo: "",
        organizedBy: "",
        prizeDetails: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getExtracurricularData");
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
            yearClass: data.yearClass,
            studentNameRegNo: data.studentNameRegNo,
            organizedBy: data.organizedBy,
            prizeDetails: data.prizeDetails,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date:new Date(formData.date),
            // numStudent:Number(formData.numStudent), 
        };
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateExtracurricularData/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newExtracurricularData ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }

            setFormData({
                date: "",
                event: "",
                resourcePerson: "",
                yearClass: "",
                studentNameRegNo: "",
                organizedBy: "",
                prizeDetails: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Student Extra-Curricular Activities</h4>
            <form onSubmit={handleSubmit}>
            <h5 className="mt-3">Participation and Achievements</h5>
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
                            <label>Student Name & Register NO:</label>
                            <input type="text" name="studentNameRegNo" className="form-control" value={formData.studentNameRegNo} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Organized By:</label>
                            <input type="text" name="organizedBy" className="form-control" value={formData.organizedBy} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Prize Won Details:</label>
                            <input type="text" name="prizeDetails" className="form-control" value={formData.prizeDetails} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Image:</label>
                            <input type="file" id="imageInput1" name="image1" accept="image/*"  />
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
                        <th>Event/Title</th>
                        <th>Resource Person</th>
                        <th>Year/Class</th>
                        <th>Student Name & Reg No</th>
                        <th>Organized By</th>
                        <th>Prize Details</th> 
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.event}</td>
                            <td>{data.resourcePerson}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.studentNameRegNo}</td>
                            <td>{data.organizedBy}</td>
                            <td>{data.prizeDetails}</td>
                            <td> <button  className="btn btn-info" onClick={() => handleEdit(data)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
       </div>
    );
};

export default ExtracurricularActivity;