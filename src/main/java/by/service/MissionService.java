package by.service;

import by.DAO.DAO;
import by.model.Mission;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.Query;
import java.io.Serializable;
import java.util.List;

@Service
public class MissionService {

    @Autowired
    private DAO<Mission> missionDAO;


    @Transactional
    public void add(Mission mission) {
        missionDAO.create(mission);
    }

    @Transactional
    public void delete(Mission mission) {
        missionDAO.delete(mission);
    }

    @Transactional
    public void edit(Mission mission) {
        missionDAO.update(mission);
    }


    @Transactional
    public List<Mission> get() {
        return missionDAO.read();
    }

    @Transactional
    public Mission getById(Serializable id) {
        return missionDAO.readById(id);
    }


    @SuppressWarnings("all")
    @Transactional
    public List<Mission> getBySensei(String senseiName) {
        SessionFactory factory = missionDAO.getFactory();
        Session session = factory.getCurrentSession();
        Query query = session.createQuery("from Mission where sensei = :sensei");
        query.setParameter("sensei", senseiName);
        return query.getResultList();
    }



}
