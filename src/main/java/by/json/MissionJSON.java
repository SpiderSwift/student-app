package by.json;

import by.model.Customer;
import by.model.Mission;

public class MissionJSON {

    private Mission mission;

    private Customer user;


    @Override
    public String toString() {
        return "MissionJSON{" +
                "mission=" + mission +
                ", user=" + user +
                '}';
    }

    public MissionJSON(Mission mission, Customer user) {
        this.mission = mission;
        this.user = user;
    }

    public MissionJSON() {

    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Customer getUser() {
        return user;
    }

    public void setUser(Customer user) {
        this.user = user;
    }
}
