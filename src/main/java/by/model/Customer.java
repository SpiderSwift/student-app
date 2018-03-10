package by.model;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "t_customer")
public class Customer {

    private String name;
    private String password;
    private List<Mission> missions;
    private Boolean isAdmin;


    public Customer(String name) {
        this.name = name;
    }


    public Customer() {

    }


    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    public List<Mission> getMissions() {
        return missions;
    }

    @Column(name = "f_admin")
    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setMissions(List<Mission> missions) {
        this.missions = missions;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    @Id
    @Column(name = "f_name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Column(name = "f_password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
