import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainingProgrammeDetails = () => {
    const [formData, setFormData] = useState({
        date: "",
        resourcePerson: "",
        trainingNature:"",
        yearClass: "",
        numOfDays: "",
        image1: null,
        image2: null,
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getTraining");
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
            resourcePerson: data.resourcePerson,
            trainingNature:data.trainingNature,
            yearClass: data.yearClass,
            numOfDays: data.numOfDays,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = new FormData(); // Use FormData to handle file uploads
        formattedData.append("date", new Date(formData.date));
        formattedData.append("resourcePerson", formData.resourcePerson);
        formattedData.append("trainingNature", formData.trainingNature);
        formattedData.append("yearClass", formData.yearClass);
        formattedData.append("numOfDays", Number(formData.numOfDays));
    
        const imageInput1 = document.getElementById("imageInput1");
        const imageInput2 = document.getElementById("imageInput2");
    
        if (imageInput1.files[0]) {
            formattedData.append("image1", imageInput1.files[0]); // Append the first image
        }
        if (imageInput2.files[0]) {
            formattedData.append("image2", imageInput2.files[0]); // Append the second image
        };
            try {
                if (editingId) {
                    const response = await axios.put(`http://localhost:3001/api/updateTraining/${editingId}`, formattedData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                    setSubmittedData(updatedData);
                    setEditingId(null); // Reset editing ID
                } else {
                    const response = await axios.post("http://localhost:3001/api/newTraining", formattedData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    setSubmittedData([...submittedData, response.data]);
                }
    
                // Reset form data
                setFormData({
                    date: "",
                    resourcePerson: "",
                    trainingNature:"",
                    yearClass: "",
                    numOfDays: "",
                    image1:"",
                    image2:""
                });
            } catch (error) {
                console.error("Error in submitting data", error);
            }
        };

    return (
        <div className="container">
            <h4 className="mt-3">Training Programme Details</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date:</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Name of resourse person</label>
                            <input type="text" name="resourcePerson" className="form-control" value={formData.resourcePerson} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Nature Of Training:</label>
                            <input type="text" name="trainingNature" className="form-control" value={formData.trainingnature} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Year/Class:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>No. of Days:</label>
                            <input type="number" name="numOfDays" className="form-control" value={formData.numOfDays} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Image1:</label>
                            <input type="file" id="imageInput1" name="image1" accept="image/*"  />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Image2:</label>
                            <input type="file" id="imageInput2" name="image2" accept="image/*"  />
                        </div>
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
            </form>

            {/* Table to display submitted data */}
            <h4 className="mt-3">Submitted Data</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name of Resource Person</th>
                        <th>Nature Of Training</th>
                        <th>Year/Class</th>
                        <th>No. of Days</th>
                        <th>image 1</th>
                        <th>image 2</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.resourcePerson}</td>
                            <td>{data.trainingNature}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.numOfDays}</td>
                            {/* <td>{data.image1}</td>
                            <td>{data.image2}</td> */}
                            <td>
                                {data.image1 ? (
                                    <a href={`http://localhost:3001/${data.image1}`} rel="noopener noreferrer">View Image 1</a>
                                ) : (
                                    "No Image"
                                )}
                                </td>
                                <td>
                                {data.image2 ? (
                                    <a href={`http://localhost:3001/${data.image2}`} rel="noopener noreferrer">View Image 2</a>
                                ) : (
                                    "No Image"
                                )}
                                </td>
                            <td>
                                <button className="m-6" >View</button>
                                <button  onClick={() => handleEdit(data)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainingProgrammeDetails;