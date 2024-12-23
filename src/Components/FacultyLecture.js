import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyLecture = () => {
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        desgination: "",
        event: "",
        organizedby: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getLecture");
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
            title: data.title,
            desgination: data.desgination,
            event: data.event,
            organizedby: data.organizedby,
        });
        setEditingId(data._id); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date: new Date(formData.date), 
           
        };
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateLecture/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newLecture ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }
            setFormData({
                date: "",
                title: "",
                desgination: "",
                event: "",
                organizedby: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Guest Lecture Delievered by the Faculty Member</h4>
            <form onSubmit={handleSubmit}>
            {/* <h5 className="mt-3">Participation and Achievements</h5> */}
                <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date:</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Title:</label>
                            <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Faculty Name & Designation:</label>
                            <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Event:</label>
                            <input type="text" name="event" className="form-control" value={formData.event} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label> Organized By:</label>
                            <input type="text" name="organizedby" className="form-control" value={formData.organizedby} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Photo/Certificate:</label>
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
                        <th>Title</th>
                        <th>Faculty Name & Designation </th>
                        <th>Event</th>
                        <th>Organized By</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.title}</td>
                            <td>{data.designation}</td>
                            <td>{data.event}</td>
                            <td>{data.organizedby}</td>
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

export default FacultyLecture;