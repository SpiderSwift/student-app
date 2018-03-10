package by.DAO;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.List;

public class DAO<O> {

    @Autowired
    private SessionFactory factory;
    private final Class<O> type;

    public DAO(Class<O> type) {
            this.type = type;
        }

    public SessionFactory getFactory() {
        return this.factory;
    }



    private Class<O> getType() {
            return this.type;
        }

    public void create(O object) {
        Session session = factory.getCurrentSession();
        session.save(object);
    }

    public List<O> read() {
        Session session = factory.getCurrentSession();
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<O> criteria = builder.createQuery(getType());
        Root<O> root = criteria.from(getType());
        criteria.select(root);
        return session.createQuery(criteria).getResultList();
    }

    public void update(O object) {
        factory.getCurrentSession().update(object);
    }

    public void delete(O object) {
        factory.getCurrentSession().remove(object);
    }

    public O readById(Serializable id) {
        return factory.getCurrentSession().get(getType(), id);
    }

}
