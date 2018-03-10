package by.model;

import javax.persistence.*;


@Entity
@Table(name = "t_profile")
public class Profile {

    private Integer id;
    private String senseiName;
    private Integer iq;
    private String power;
    private String rank;
    private String skills;

    @Override
    public String toString() {
        return id + ";" + senseiName + ";" + iq + ";" + power + ";" + rank + ";" + skills + ";";
    }

    public Profile() {

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


    @Column(name = "f_sensei")
    public String getSenseiName() {
        return senseiName;
    }

    public void setSenseiName(String senseiName) {
        this.senseiName = senseiName;
    }

    @Column(name = "f_iq")
    public Integer getIq() {
        return iq;
    }

    public void setIq(Integer iq) {
        this.iq = iq;
    }

    @Column(name = "f_power")
    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }


    @Column(name = "f_rank")
    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    @Column(name = "f_skills")
    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }
}
