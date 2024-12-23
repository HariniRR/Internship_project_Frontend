import React, { useState, useEffect } from "react";
import axios from "axios";

const Awards = () => {
    const [formData, setFormData] = useState({
        date: "",
        event: "",
        studentRegno: "",
        yearClass: "",
        organized: "",
        price: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getAwards");
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
            studentRegno: data.studentRegno,
            yearClass: data.yearClass,
            organized:data.organized,
            price: data.price,
        });
        setEditingId(data._id); // Set the ID of the entry being edited
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date:new Date(formData.date),
        };
        try {
            if (editingId) {
                const response = await axios.put(`http://localhost:3001/api/updateAwards/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newAwards ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }
            setFormData({
                date: "",
                event: "",
                studentRegno: "",
                yearClass: "",
                organized: "",
                price: "",
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Student Awards/Achievements Details</h4>
            <form onSubmit={handleSubmit}>
            <h5 className="mt-3">Participation and Achievements</h5>
                <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Date:</label>
                            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Event Name:</label>
                            <input type="text" name="event" className="form-control" value={formData.event} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Student Name & Register NO:</label>
                            <input type="text" name="studentRegno" className="form-control" value={formData.studentRegno} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Year/Class:</label>
                            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="form-group col-md-3 mb-3">
                            <label>Organized By:</label>
                            <input type="text" name="organized" className="form-control" value={formData.organized} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3 mb-3">
                            <label>Prize Won Details:</label>
                            <input type="text" name="price" className="form-control" value={formData.price} onChange={handleChange} />
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
                        <th>Event</th>
                        <th>Student Name & Reg No</th>
                        <th>Year/Class</th>
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
                            <td>{data.studentRegno}</td>
                            <td>{data.yearClass}</td>
                            <td>{data.organized}</td>
                            <td>{data.price}</td>
                            <button  className="btn btn-info" onClick={() => handleEdit(data)}>Edit</button>
                        </tr>
                    ))}
                </tbody>
            </table>
       </div>
    );
};

export default Awards;