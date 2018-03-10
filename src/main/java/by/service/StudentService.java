package by.service;

import by.DAO.DAO;
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
public class StudentService {

    @Autowired
    private DAO<Student> studentDAO;


    @Transactional
    public void add(Student student) {
        studentDAO.create(student);
    }

    @Transactional
    public void delete(Student student) {
        studentDAO.delete(student);
    }

    @Transactional
    public void edit(Student student) {
        studentDAO.update(student);
    }


    @Transactional
    public List<Student> get() {
        return studentDAO.read();
    }

    @Transactional
    public Student getById(Serializable id) {
        return studentDAO.readById(id);
    }

    @Transactional
    public Student getBySensei(String senseiName) {
        SessionFactory factory = studentDAO.getFactory();
        Session session = factory.getCurrentSession();
        Query query = session.createQuery("from Student where senseiName = :senseiName ");
        query.setParameter("senseiName", senseiName);
        List list = query.getResultList();
        if (list.size() > 0) {
            return (Student) list.get(0);
        } else {
            return null;
        }

    }


    @Transactional
    public Student getByName(String studentName) {
        SessionFactory factory = studentDAO.getFactory();
        Session session = factory.getCurrentSession();
        Query query = session.createQuery("from Student where name = :studentName ");
        query.setParameter("studentName", studentName);
        List list = query.getResultList();
        if (list.size() > 0) {
            return (Student) list.get(0);
        } else {
            return null;
        }
    }


}
