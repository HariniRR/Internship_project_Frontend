import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyPart = () => {
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        facultyNameDesignation: "",
        event: "",
        organizedBy: "",
        eventDetails: "",
    });

    const [submittedData, setSubmittedData] = useState([]);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getFacultyParticipation");
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date:new Date(formData.date),
            numStudent:Number(formData.numStudent), 
        };
        try {
            // Make POST request to submit form data
            const response = await axios.post("http://localhost:3001/api/newFacultyParticipation", formattedData);
            console.log(response.data);
            // Update submittedData with the new entry
            setSubmittedData([...submittedData, response.data]);
            // Reset form data
            setFormData({
                date: "",
                title: "",
                facultyNameDesignation: "",
                event: "",
                organizedBy: "",
                eventDetails: "",
                
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Faculty Participation in Seminar/Conference/Workshop etc.</h4>
            <form onSubmit={handleSubmit}>
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
                        <input type="text" name="facultyNameDesignation" className="form-control" value={formData.facultyNameDesignation} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Event:</label>
                        <input type="text" name="event" className="form-control" value={formData.event} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>Organized by:</label>
                        <input type="text" name="organizedBy" className="form-control" value={formData.organizedBy} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Event Details (Name & Date):</label>
                        <input type="text" name="eventDetails" className="form-control" value={formData.eventDetails} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo1/Certificate:</label>
                        <input type="file" id="imageInput1" name="image1" accept="image"  />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Photo2/Certificate:</label>
                        <input type="file" id="imageInput2" name="image2" accept="image"/>
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
                        <th>Title</th>
                        <th>Faculty Name & Designation</th>
                        <th>Event</th>
                        <th>Organized By</th>
                        <th>Event Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.title}</td>
                            <td>{data.facultyNameDesignation}</td>
                            <td>{data.event}</td>
                            <td>{data.organizedBy}</td>
                            <td>{data.eventDetails}</td>
                            <td>
                                <button className="mr-5">View</button>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyPart;