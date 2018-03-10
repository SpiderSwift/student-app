package by.service;

import by.DAO.DAO;
import by.model.Sensei;
import by.model.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.io.Serializable;
import java.util.List;

@Service
public class SenseiService {

    @Autowired
    private DAO<Sensei> senseiDAO;


    @Transactional
    public void add(Sensei sensei) {
        senseiDAO.create(sensei);
    }

    @Transactional
    public void delete(Sensei sensei) {
        senseiDAO.delete(sensei);
    }

    @Transactional
    public void edit(Sensei sensei) {
        senseiDAO.update(sensei);
    }


    @Transactional
    public List<Sensei> get() {
        return senseiDAO.read();
    }

    @Transactional
    public Sensei getById(Serializable id) {
        return senseiDAO.readById(id);
    }

    @Transactional
    public Sensei getByStudent(String studentName) {
        SessionFactory factory = senseiDAO.getFactory();
        Session session = factory.getCurrentSession();
        Query query = session.createQuery("from Sensei where student = :studentName ");
        query.setParameter("studentName", studentName);
        List list = query.getResultList();
        if (list.size() > 0) {
            return (Sensei) list.get(0);
        } else {
            return null;
        }

    }


    @Transactional
    public Sensei getByName(String senseiName) {
        SessionFactory factory = senseiDAO.getFactory();
        Session session = factory.getCurrentSession();
        Query query = session.createQuery("from Sensei where name = :senseiName ");
        query.setParameter("senseiName", senseiName);
        List list = query.getResultList();
        if (list.size() > 0) {
            return (Sensei) list.get(0);
        } else {
            return null;
        }
    }

}
