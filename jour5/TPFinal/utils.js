// Tableaux des étudiants  
const students = [
    { name : "Sonia", birth : "2019-14-05"},
    { name : "Antoine", birth : "2000-12-05"},
    { name : "Alice", birth : "1990-14-09"},
    { name : "Sophie", birth : "2001-10-02"},
    { name : "Bernard", birth : "1980-21-08"}
];

// J'ajoute un étudiant à la liste
function addStudent(name, birth, students) {
    students.push({ name: name, birth: birth });
  }

// je supprime un étudiant de ma liste
function deleteStudent(name, students) {
    const index = students.findIndex(student => student.name === name);
    if (index !== -1) {
      students.splice(index, 1);
    }
  }



module.exports = {
    deleteStudent: deleteStudent,
    addStudent: addStudent,
    students: students
  };