import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClubActivity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    event: "",
    clubname: "",
    resourcePerson: "",
    yearClass: "",
    studentNum: "",
    image1: null,
    image2: null,
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getClubActivity");
        setSubmittedData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
        ...formData,
        [name]: files[0], // Set the first file in the file list
    });
};

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
        clubname: data.clubname,
        resourcePerson: data.resourcePerson,
        yearClass: data.yearClass,
        studentNum: data.studentNum,
    });
    setEditingId(data._id); 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log formData to verify its contents
    console.log("Form data before submission:", formData);
        const formattedData = new FormData(); // Use FormData to handle file uploads
        formattedData.append("date", new Date(formData.date));
        formattedData.append("event", formData.event);
        formattedData.append("clubname", formData.clubname);
        formattedData.append("resourcePerson", formData.resourcePerson);
        formattedData.append("yearClass", formData.yearClass);
        formattedData.append("studentNum", Number(formData.studentNum));
    
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
        const response = await axios.put(`http://localhost:3001/api/updateClubActivity/${editingId}`, formattedData);
        const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
        setSubmittedData(updatedData);
        setEditingId(null); // Reset editing ID
    } else {
        const response = await axios.post("http://localhost:3001/api/newClubActivity ", formattedData);
        setSubmittedData([...submittedData, response.data]);
    }
      setFormData({
        date: "",
        event: "",
        clubname: "",
        resourcePerson: "",
        yearClass: "",
        studentNum: "",
        image1: null,
        image2: null,
      });
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="container">
      <h4 className="mt-3 text-primary">Club Activity</h4>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="form-group col-md-3 mb-3">
            <label>Date:</label>
            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Event/Title:</label>
            <input type="text" name="event" className="form-control" value={formData.event} onChange={handleChange} />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Club Name:</label>
            <input type="text" name="clubname" className="form-control" value={formData.clubname} onChange={handleChange} />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Resource Person:</label>
            <input type="text" name="resourcePerson" className="form-control" value={formData.resourcePerson} onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-md-3 mb-3">
            <label>Year/Class:</label>
            <input type="text" name="yearClass" className="form-control" value={formData.yearClass} onChange={handleChange} />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>No. of Students:</label>
            <input type="number" name="studentNum" className="form-control" value={formData.studentNum} onChange={handleChange} />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Image1:</label>
            <input type="file" id="imageInput1" name="image1" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Image2:</label>
            <input type="file" id="imageInput2" name="image2" accept="image/*" onChange={handleFileChange}/>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-success" value="Submit" />
        </div>
      </form>

      {/* Table to display submitted data */}
      <h4 className="mt-3">Submitted Data</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event/Title</th>
            <th>Club Name</th>
            <th>Resource Person</th>
            <th>Year/Class</th>
            <th>No. of Students</th>
            <th>Photo1</th>
            <th>Photo2</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td>{new Date(data.date).toLocaleDateString()}</td>
              <td>{data.event}</td>
              <td>{data.clubname}</td>
              <td>{data.resourcePerson}</td>
              <td>{data.yearClass}</td>
              <td>{data.studentNum}</td>
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
              <button  className="btn btn-info" onClick={() => handleEdit(data)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubActivity;
