import React, { useState, useEffect } from "react";
import axios from "axios";

const Publication = () => {
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        studentReg: "",
        yearClass: "",
        published: "",
        conference: "",
        volume: "",
        journalName: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getPublished");
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
        studentReg:data.studentReg,
        yearClass: data.yearClass,
        published: data.published,
        conference: data.conference,
        volume: data.volume,
        journalName: data.journalName,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date: new Date(formData.date), 
            // numStudent: Number(formData.numStudent), 
        };
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updatePublished/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newPublished ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }

            setFormData({
                date: "",
                title: "",
                studentReg: "",
                yearClass: "",
                published: "",
                conference: "",
                volume: "",
                journalName: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Student Publication Details</h4>
            <form onSubmit={handleSubmit}>
            {/* <h5 className="mt-3">Participation and Achievements</h5> */}
                <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date,Month&Year:</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Title:</label>
                            <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Student Name & Register NO:</label>
                            <input type="text" name="studentReg" className="form-control" value={formData.studentReg} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Year/Class:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Published/Presented:</label>
                            <input type="text" name="published" className="form-control" value={formData.published} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Conference/Journal  :</label>
                            <input type="text" name="conference" className="form-control" value={formData.conference} onChange={handleChange} />
                        </div>
                       
                       <div className="form-group col-md-3 mb-3">
                            <label>ISSN No./Volume/Page No:</label>
                            <input type="text" name="volume" className="form-control" value={formData.volume} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Name Of Journal/Conference  :</label>
                            <input type="text" name="journalName" className="form-control" value={formData.journalName} onChange={handleChange} />
                        </div>
                       </div>
                       <div className="row">
                       <div className="form-group col-md-3 mb-3">
                            <label>Photo/Certificate:</label>
                            <input type="file" id="imageInput1" name="image1" accept="image/*" />
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
                        <th>Student Name & Reg No </th>
                        <th>Year/Class</th>
                        <th>Published/Presented </th>
                        <th>Conference/Journal</th>
                        <th>ISSN No./Volume/Page No</th>
                        <th>Name Of Journal/Conference </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.title}</td>
                            <td>{data.studentReg}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.published}</td>
                            <td>{data.conference}</td>
                            <td>{data.volume}</td>
                            <td>{data.journalName}</td>
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

export default Publication;