import React, { useState, useEffect } from "react";
import axios from "axios";

const OnlineCourse = () => {
    const [formData, setFormData] = useState({
        date: "",
        platform: "",
        studentNameRegno: "",
        course: "",
        register: "",
        score: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch data from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/getOnlineCourse");
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
            platform: data.platform,
            studentNameRegno: data.studentNameRegno,
            course: data.course,
            score: data.score,
            register: data.register,
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
                const response = await axios.put(`http://localhost:3001/api/updateOnlineCourse/${editingId}`, formattedData);
                const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
                setSubmittedData(updatedData);
                setEditingId(null); // Reset editing ID
            } else {
                const response = await axios.post("http://localhost:3001/api/newOnlineCourse ", formattedData);
                setSubmittedData([...submittedData, response.data]);
            }
            setFormData({
                date: "",
                platform: "",
                studentNameRegno: "",
                course: "",
                register: "",
                score: "",
                
            });
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="container">
            <h4 className="mt-3 text-primary">Student Online Course Details</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>Date (From-To):</label>
                        <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Online Platform:</label>
                        <input type="text" name="platform" className="form-control" value={formData.platform} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Student Name & Register No:</label>
                        <input type="text" name="studentNameRegno" className="form-control" value={formData.studentNameRegno} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Course Title:</label>
                        <input type="text" name="course" className="form-control" value={formData.course} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3 mb-3">
                        <label>Register/Completed:</label>
                        <input type="text" name="register" className="form-control" value={formData.register} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Score/Grade:</label>
                        <input type="text" name="score" className="form-control" value={formData.score} onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label>Certificate Photo:</label>
                        <input type="file" name="image1" accept="image/*"  />
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
                        <th>Platform</th>
                        <th>Student Name & Register No</th>
                        <th>Course Title</th>
                        <th>Register/Completed</th>
                        <th>Score/Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{new Date(data.date).toLocaleDateString()}</td>
                            <td>{data.platform}</td>
                            <td>{data.studentNameRegno}</td>
                            <td>{data.course}</td>
                            <td>{data.register}</td>
                            <td>{data.score}</td>
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

export default OnlineCourse;
