package by.json;

import by.model.Student;

public class StudentEditJSON {

    private Student newStudent;
    private Integer id;


    @Override
    public String toString() {
        return "StudentEditJSON{" +
                "newStudent=" + newStudent +
                ", id=" + id +
                '}';
    }

    public StudentEditJSON() {

    }

    public Student getNewStudent() {
        return newStudent;
    }

    public void setNewStudent(Student newStudent) {
        this.newStudent = newStudent;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
