import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './Components/UserLogin';
import Sidebar from './Components/Sidebar';
import Department from './Components/Department';
import StudentActivity from './Components/Student';
import AssociationDetails from './Components/DepartmentAssociationDetails';
import ClubActivity from './Components/DepartmentClubActivity';
import ValueAddedCourse from './Components/DepartmentValueAddedCourse';
import Mou from './Components/DepartmentMou';
import Consultancy from './Components/DepartmentConsultancy';
import Program from './Components/DepartmentProgram';
import Infrastructure from './Components/DepartmentInfrastructure';
import Header from './Components/Header';
import CocurricularActivity from './Components/StudentCocurricularActivity';
import ExtracurricularActivity from './Components/StudentExtracurricularActivity';
import OnlineCourse from './Components/StudentOnlineCourse';
import Internship from './Components/StudentInternship';
import Publication from './Components/StudentPublication';
import Awards from './Components/StudentAwards';
import Tour from './Components/StudentTour';
import Faculty from './Components/Faculty';
import FacultyPart from './Components/FacultyPart';
import FacultyLecture from './Components/FacultyLecture';
import FacultyCourse from './Components/FacultyCourse';
import FacultyAwards from './Components/FacultyAwards';
import InstituteProfessional from './Components/InstituteProfessional';
import Institute_ActivityStudent from './Components/Institute_ActivityStudent';
import Institute_ActivityFaculty from './Components/Institute_ActivityFaculty';
import InstituteClub from './Components/InstituteClub';
import Institute_Entrepreneurshipcareer from './Components/Institute_Entrepreneurshipcareer';
import InstituteMou from './Components/InstituteMou';
import PlacementDashboard from './Components/PlacementDashboard';
import TrainingProgrammeDetails from './Components/TrainingProgrammeDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <div className="main-container" style={{ display: 'flex' }}>
        {isLoggedIn && <Sidebar />} {/* Conditionally render Sidebar */}
        <div className="content" style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path='/' element={<UserLogin onLogin={() => setIsLoggedIn(true)} />} />
            {isLoggedIn ? (
              <>
                <Route path='AssociationDetails' element={<AssociationDetails />} />
                <Route path='department' element={<Department />} />
                <Route path='student' element={<StudentActivity />} />
                <Route path='Sidebar' element={<Sidebar />} />
                <Route path='clubname' element={<ClubActivity />} />
                <Route path='valueaddedcourse' element={<ValueAddedCourse />} />
                <Route path='mou' element={<Mou />} />
                <Route path='program' element={<Program />} />
                <Route path='consultancy' element={<Consultancy />} />
                <Route path='infrastructure' element={<Infrastructure />} />
                <Route path='cocurricular' element={<CocurricularActivity />} />
                <Route path='extracurricular' element={<ExtracurricularActivity />} />
                <Route path='onlinecourse' element={<OnlineCourse />} />
                <Route path='internship' element={<Internship />} />
                <Route path='publication' element={<Publication />} />
                <Route path='awards' element={<Awards />} />
                <Route path='tour' element={<Tour />} />
                <Route path='faculty' element={<Faculty />} />
                <Route path='participation' element={<FacultyPart />} />
                <Route path='lecture' element={<FacultyLecture />} />
                <Route path='course' element={<FacultyCourse />} />
                <Route path='faculty-awards' element={<FacultyAwards />} />
                <Route path='institute' element={<InstituteProfessional />} />
                <Route path='studentactivity' element={<Institute_ActivityStudent />} />
                <Route path='facultyactivity' element={<Institute_ActivityFaculty />} />
                <Route path='instituteclub' element={<InstituteClub />} />
                <Route path='career' element={<Institute_Entrepreneurshipcareer />} />
                <Route path='institutemou' element={<InstituteMou />} />
                <Route path='institute/society' element={<InstituteProfessional />} />
                <Route path='institute/placement' element={<PlacementDashboard/>} />
                <Route path='training' element={<TrainingProgrammeDetails  />} /> 
              </>
            ) : 
            (
              <Route path='*' element={<Navigate to="/" />} />
            )
            }
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
