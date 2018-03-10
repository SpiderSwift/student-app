package by.json;

import by.model.Profile;

public class ProfileEditJSON {

    private Integer id;
    private Profile newProfile;

    public ProfileEditJSON() {

    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Profile getNewProfile() {
        return newProfile;
    }

    public void setNewProfile(Profile newProfile) {
        this.newProfile = newProfile;
    }
}
