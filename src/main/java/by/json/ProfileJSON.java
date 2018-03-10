package by.json;

import by.model.Profile;

public class ProfileJSON {
    private Profile profile;


    @Override
    public String toString() {
        return "ProfileJSON{" +
                "profile=" + profile +
                '}';
    }

    public ProfileJSON() {

    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
