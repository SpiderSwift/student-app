package by.service;

import by.DAO.DAO;

import by.model.Profile;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.io.Serializable;
import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private DAO<Profile> profileDAO;


    @Transactional
    public void add(Profile profile) {
        profileDAO.create(profile);
    }

    @Transactional
    public void delete(Profile profile) {
        profileDAO.delete(profile);
    }

    @Transactional
    public void edit(Profile profile) {
        profileDAO.update(profile);
    }


    @Transactional
    public List<Profile> get() {
        return profileDAO.read();
    }

    @Transactional
    public Profile getById(Serializable id) {
        return profileDAO.readById(id);
    }


    @Transactional
    public Profile getBySensei(String senseiName) {
        SessionFactory factory = profileDAO.getFactory();
        Session session = factory.getCurrentSession();
        Query query = session.createQuery("from Profile where senseiName = :senseiName ");
        query.setParameter("senseiName", senseiName);
        List list = query.getResultList();
        if (list.size() > 0) {
            return (Profile) list.get(0);
        } else {
            return null;
        }
    }


}
