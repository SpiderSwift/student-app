package by.json;

import by.model.Customer;

public class MissionDeleteJSON {

    private Integer id;
    private Customer user;


    @Override
    public String toString() {
        return "MissionDeleteJSON{" +
                "id=" + id +
                ", user=" + user +
                '}';
    }

    public MissionDeleteJSON() {

    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(Customer user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public Customer getUser() {
        return user;
    }
}
