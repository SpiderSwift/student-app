package by.json;

import by.model.Customer;
import by.model.Mission;

public class MissionEditJSON {


    private Mission newMission;
    private Integer id;
    private Customer user;


    @Override
    public String toString() {
        return "MissionJSON{" +
                "newMission=" + newMission +
                ", user=" + user +
                '}';
    }

    public MissionEditJSON(Mission newMission, Customer user) {
        this.newMission = newMission;
        this.user = user;
    }

    public MissionEditJSON() {

    }

    public Mission getNewMission() {
        return newMission;
    }

    public void setNewMission(Mission newMission) {
        this.newMission = newMission;
    }

    public Customer getUser() {
        return user;
    }

    public void setUser(Customer user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
