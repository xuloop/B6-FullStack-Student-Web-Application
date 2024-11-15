import React from 'react';
import ClassList from './components/ClassList';
import FileList from './components/FileList';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';
import AddClassForm from './components/AddClassForm';
import AddFileForm from './components/AddFileForm';
import AddStudentForm from './components/AddStudentForm';
import DeleteStudent from './components/DeleteStudent';
import './App.css';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <div>
      <header className="header" >SJSU Student Management System</header>
      <ClassList />
      <FileList />
      <AddClassForm />
      <AddFileForm />
      <StudentList />
      <AddStudentForm />
      <DeleteStudent />
      <EditStudent />
      <SearchStudent />
    </div>
  );
}

export default App;
