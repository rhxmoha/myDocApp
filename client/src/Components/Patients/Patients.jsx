import React, {useState, useEffect} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faEdit, faPlus, faSortUp, faSortDown} from "@fortawesome/free-solid-svg-icons";
import "./Patients.css";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [updatedPatient, setUpdatedPatient] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [newPatient, setNewPatient] = useState({});
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [patientAges, setPatientAges] = useState({});

  useEffect(() => {

    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      console.log(response.data); // Log the response data to the console
      setPatients(response.data);

      const ages = {};
      for (const patient of response.data) {
        const ageResponse = await axios.get(`http://localhost:5000/api/patients/${patient.patient_id}/age`);
        ages[patient.patient_id] = ageResponse.data.age;
      }
      setPatientAges(ages);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      await fetchPatients();
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/patients`, newPatient);
      await fetchPatients();
      setIsAddFormVisible(false);
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  };

  const handleNewInputChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/patients/${updatedPatient.patient_id}`, updatedPatient);
      await fetchPatients(); // Fetch updated data after successful update
      setIsFormVisible(false);
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };


  const handleInputChange = (e) => {
    setUpdatedPatient({
      ...updatedPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  const currentItems = sortedPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const itemsBeingShown = currentItems.length;
  const renderItemsMessage = `Showing ${itemsBeingShown} item${itemsBeingShown === 1 ? '' : 's'} out of ${patients.length} total`
  return (
    <div className="patients-container">
      <h2>Patients</h2>
      <button className="add-button" onClick={() => setIsAddFormVisible(true)}>
        <FontAwesomeIcon icon="fas fa-users-medical" />
        Add Patient
      </button>
      <table>
        <thead>
        <tr>
          <th onClick={() => handleSort('patient_id')}>
            Patient ID{' '}
            {sortField === 'patient_id' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_fname')}>
            First Name{' '}
            {sortField === 'patient_fname' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_lname')}>
            Last Name{' '}
            {sortField === 'patient_lname' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_phonenum')}>
            Phone Number{' '}
            {sortField === 'patient_phonenum' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>

          <th onClick={() => handleSort('patient_sex')}>
            Sex{' '}
            {sortField === 'patient_sex' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_email')}>
            Email{' '}
            {sortField === 'patient_email' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_cin')}>
            CIN{' '}
            {sortField === 'patient_cin' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_city')}>
            City{' '}
            {sortField === 'patient_city' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th onClick={() => handleSort('patient_street')}>
            Street{' '}
            {sortField === 'patient_street' && (
              <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown}/>
            )}
          </th>
          <th>Age</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {currentItems.map((patient) => (
          <tr key={patient.patient_id}>
            <td>{patient.patient_id}</td>
            <td>{patient.patient_fname}</td>
            <td>{patient.patient_lname}</td>
            <td>{patient.patient_phonenum}</td> {/* Add this line */}
            <td>{patient.patient_sex}</td>
            <td>{patient.patient_email}</td>
            <td>{patient.patient_cin}</td>
            <td>{patient.patient_city}</td>
            <td>{patient.patient_street}</td>
            <td>{patientAges[patient.patient_id]}</td>
            <td>
              <button onClick={() => deletePatient(patient.patient_id)}>
                <FontAwesomeIcon icon={faTrashAlt}/>
              </button>
              <button onClick={() => {
                setUpdatedPatient(patient);
                setIsFormVisible(true);
              }}>
                <FontAwesomeIcon icon={faEdit}/>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
        <div className="item-message">
          {renderItemsMessage}
        </div>
      </div>
      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsFormVisible(false)}>&times;</span>
            <h2>Update Patient</h2>
            <form onSubmit={handleUpdate}>
              <input type="text" name="patient_fname" value={updatedPatient.patient_fname} onChange={handleInputChange}
                     placeholder="First Name" required className="form-input"/>
              <input type="text" name="patient_lname" value={updatedPatient.patient_lname} onChange={handleInputChange}
                     placeholder="Last Name" required className="form-input"/>

              <input type="text" name="patient_sex" value={updatedPatient.patient_sex} onChange={handleInputChange}
                     placeholder="Sex" required className="form-input"/>
              <input
                type="date"
                name="patient_dateofbirth"
                value={updatedPatient.patient_dateofbirth || ''}
                onChange={handleInputChange}
                required
              />

              <input
                type="email"
                name="patient_email"
                value={updatedPatient.patient_email}
                onChange={handleNewInputChange}
                placeholder="Email"
                required
                className="form-input"
              />

              <input
                type="text"
                name="patient_phonenum"
                value={updatedPatient.patient_phonenum}
                onChange={handleNewInputChange}
                placeholder="Phone Number"
                required
                className="form-input"
              />

              <input
                type="text"
                name="patient_cin"
                value={updatedPatient.patient_cin}
                onChange={handleNewInputChange}
                placeholder="CIN"
                required
                className="form-input"
              />
              <input
                type="text"
                name="patient_city"
                value={updatedPatient.patient_city}
                onChange={handleNewInputChange}
                placeholder="City"
                required
                className="form-input"
              />
              <input type="text" name="patient_street" value={updatedPatient.patient_street}
                     onChange={handleInputChange} placeholder="Street" required className="form-input"/>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {isAddFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsAddFormVisible(false)}>&times;</span>
            <h2>Add Patient</h2>
            <form onSubmit={handleAdd}>
              <input type="text" name="patient_fname" value={newPatient.patient_fname} onChange={handleNewInputChange}
                     placeholder="First Name" required className="form-input"/>
              <input type="text" name="patient_lname" value={newPatient.patient_lname} onChange={handleNewInputChange}
                     placeholder="Last Name" required className="form-input"/>
              <input type="text" name="patient_sex" value={newPatient.patient_sex} onChange={handleNewInputChange}
                     placeholder="Sex" required className="form-input"/>
              <input
                type="date"
                name="patient_dateofbirth"
                value={newPatient.patient_dateofbirth || ''}
                onChange={handleNewInputChange}
                required
              />
              <input
                type="email"
                name="patient_email"
                value={newPatient.patient_email}
                onChange={handleNewInputChange}
                placeholder="Email"
                required
                className="form-input"
              />

              <input
                type="text"
                name="patient_phonenum"
                value={newPatient.patient_phonenum}
                onChange={handleNewInputChange}
                placeholder="Phone Number"
                required
                className="form-input"
              />

              <input
                type="text"
                name="patient_cin"
                value={newPatient.patient_cin}
                onChange={handleNewInputChange}
                placeholder="CIN"
                required
                className="form-input"
              />
              <input
                type="text"
                name="patient_city"
                value={newPatient.patient_city}
                onChange={handleNewInputChange}
                placeholder="City"
                required
                className="form-input"
              />
              <input type="text" name="patient_street" value={newPatient.patient_street} onChange={handleNewInputChange}
                     placeholder="Street" required className="form-input"/>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}