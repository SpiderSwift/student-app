package by.model;


import javax.persistence.*;

@Entity
@Table(name = "t_student")
public class Student {
    private Integer id;
    private String name;
    private Integer age;
    private String senseiName;


    @Override
    public String toString() {
        return id + ";" + name + ";" + age + ";" + senseiName + ";";
    }

    public Student() {

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

    @Column(name = "f_age")
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Column(name = "f_sensei")
    public String getSenseiName() {
        return senseiName;
    }


    public void setSenseiName(String senseiName) {
        this.senseiName = senseiName;
    }
}
