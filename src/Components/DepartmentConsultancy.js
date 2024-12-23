import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Consultancy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    event: "",
    companyname: "",
    resourcePerson: "",
    amount: "",
    status: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch data from the database when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getConsultancy");
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
        companyname:  data.companyname,
        resourcePerson: data.resourcePerson,
        amount: data.amount,
        status: data.status,
    });
    setEditingId(data._id); // Set the ID of the entry being edited
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const formattedData = {
      ...formData,
      date: new Date(formData.date),
    };
    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:3001/api/updateConsultancy/${editingId}`, formattedData);
        const updatedData = submittedData.map(data => data._id === editingId ? response.data : data);
        setSubmittedData(updatedData);
        setEditingId(null); // Reset editing ID
    } else {
        const response = await axios.post("http://localhost:3001/api/newConsultancy ", formattedData);
        setSubmittedData([...submittedData, response.data]);
    }
      setFormData({
        date: "",
        event: "",
        companyname: "",
        resourcePerson: "",
        amount: "",
        status: "",
      });
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="container">
      <h4 className="mt-3 mb-4 text-primary">Department Consultancy Activities</h4>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="form-group col-md-3 mb-3">
            <label className="form-label">Company Name:</label>
            <input
              type="text"
              name="companyname"
              className="form-control"
              value={formData.companyname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label className="form-label">Project Title:</label>
            <input
              type="text"
              name="event"
              className="form-control"
              value={formData.event}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label className="form-label">Faculty Members:</label>
            <input
              type="text"
              name="resourcePerson"
              className="form-control"
              value={formData.resourcePerson}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label className="form-label">Amount:</label>
            <input
              type="text"
              name="amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Status:</label>
            <input
              type="text"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>

      {/* Table to display submitted data */}
      <h4 className="mt-3">Submitted Data</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Company Name</th>
            <th>Project Title</th>
            <th>Faculty Members</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td>{new Date(data.date).toLocaleDateString()}</td>
              <td>{data.companyname}</td>
              <td>{data.event}</td>
              <td>{data.resourcePerson}</td>
              <td>{data.amount}</td>
              <td>{data.status}</td>
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

export default Consultancy;
