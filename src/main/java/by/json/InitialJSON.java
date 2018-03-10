package by.json;

import by.model.Profile;
import by.model.Sensei;
import by.model.Student;

import java.util.List;

public class InitialJSON {

    private List<Profile> profiles;
    private List<Student> students;
    private List<Sensei> senseis;


    public InitialJSON() {

    }



    public List<Profile> getProfiles() {
        return profiles;
    }

    public void setProfiles(List<Profile> profiles) {
        this.profiles = profiles;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<Sensei> getSenseis() {
        return senseis;
    }

    public void setSenseis(List<Sensei> senseis) {
        this.senseis = senseis;
    }



}
