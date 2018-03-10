package by.model;

import javax.persistence.*;


@Entity
@Table(name = "t_shinobi")
public class Sensei {

    private Integer id;
    private String name;
    private Integer missionsCompleted;
    private String student;

    @Override
    public String toString() {
        return id + ";" + name + ";" + missionsCompleted + ";" + student + ";";
    }


    public Sensei() {

    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    @Column(name = "f_name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "f_missions")
    public Integer getMissionsCompleted() {
        return missionsCompleted;
    }

    public void setMissionsCompleted(Integer missionCompleted) {
        this.missionsCompleted = missionCompleted;
    }

    @Column(name = "f_student")
    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }
}
