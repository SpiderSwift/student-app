package by.test;

import by.DAO.DAO;
import by.generator.CsvGenerator;
import by.generator.ExcelGenerator;
import by.generator.PdfGenerator;
import by.model.*;
import by.service.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;


@SuppressWarnings("all")
@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:dispatcher-servlet.xml")
public class TestClass {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MissionService missionService;

    @Autowired
    private SenseiService senseiService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private DAO<Customer> customerDAO;

    @Autowired
    private DAO<Mission> missionDAO;

    @Autowired
    private DAO<Sensei> senseiDAO;

    @Autowired
    private DAO<Student> studentDAO;

    @Autowired
    private DAO<Profile> profileDAO;

    @Test
    @Transactional
    public void testCustomerDAOReadById() {
        Customer customer = customerDAO.readById("Hokage");
        assert customer != null;
    }

    @Test
    @Transactional
    public void testCustomerDAORead() {
        List<Customer> customers = customerDAO.read();
        assert customers != null;
    }

    @Test
    @Transactional
    public void testCustomerDAODelete() {
        Customer customer = customerDAO.readById("Artem");
        customerDAO.delete(customer);
        customer = customerDAO.readById("Artem");
        assert customer == null;
    }


    @Test
    @Transactional
    public void testCustomerDAOUpdate() {
        Customer customer = customerDAO.readById("Artem");
        customer.setPassword("1234");
        customerDAO.update(customer);
        Customer customer1 = customerDAO.readById("Artem");
        assert customer1.getPassword().equals("1234");
    }

    @Test
    @Transactional
    public void testCustomerDAOCreate() {
        Customer customer = new Customer();
        customer.setName("Abc");
        customerDAO.create(customer);
        Customer c = customerDAO.readById("Abc");
        assert c != null;

    }

    @Test
    @Transactional
    public void testProfileDAOReadById() {
        Profile profile = profileDAO.readById(7);
        assert profile != null;
    }

    @Test
    @Transactional
    public void testProfileDAORead() {
        List<Profile> profiles = profileDAO.read();
        assert profiles != null;
    }

    @Test
    @Transactional
    public void testProfileDAODelete() {
        Profile profile = profileDAO.readById(7);
        profileDAO.delete(profile);
        profile = profileDAO.readById(7);
        assert profile == null;
    }


    @Test
    @Transactional
    public void testProfileDAOUpdate() {
        Profile profile = profileDAO.readById(7);
        profile.setIq(200);
        profileDAO.update(profile);
        Profile profile1 = profileDAO.readById(7);
        assert profile1.getIq().equals(200);
    }

    @Test
    @Transactional
    public void testProfileDAOCreate() {
        Profile profile = new Profile();
        profileDAO.create(profile);
        assert profile.getId() != null;
    }

    @Test
    @Transactional
    public void testMissionDAOReadById() {
        Mission mission = missionDAO.readById(1);
        assert mission != null;
    }

    @Test
    @Transactional
    public void testMissionDAORead() {
        List<Mission> missions = missionDAO.read();
        assert missions != null;
    }

    @Test
    @Transactional
    public void testMissionDAODelete() {
        Mission mission = missionDAO.readById(1);
        missionDAO.delete(mission);
        mission = missionDAO.readById(1);
        assert mission == null;
    }


    @Test
    @Transactional
    public void testMissionDAOUpdate() {
        Mission mission = missionDAO.readById(1);
        mission.setSensei("gachi");
        missionDAO.update(mission);
        Mission mission1 = missionDAO.readById(1);
        assert mission1.getSensei().equals("gachi");
    }

    @Test
    @Transactional
    public void testMissionDAOCreate() {
        Mission mission = new Mission();
        missionDAO.create(mission);
        assert mission.getId() != null;
    }


    @Test
    @Transactional
    public void testSenseiDAOReadById() {
        Sensei sensei = senseiDAO.readById(18);
        assert sensei != null;
    }

    @Test
    @Transactional
    public void testSenseiDAORead() {
        List<Sensei> senseis = senseiDAO.read();
        assert senseis != null;
    }

    @Test
    @Transactional
    public void testSenseiDAODelete() {
        Sensei sensei = senseiDAO.readById(18);
        senseiDAO.delete(sensei);
        sensei = senseiDAO.readById(18);
        assert sensei == null;
    }


    @Test
    @Transactional
    public void testSenseiDAOUpdate() {
        Sensei sensei = senseiDAO.readById(18);
        sensei.setMissionsCompleted(30);
        senseiDAO.update(sensei);
        Sensei sensei1 = senseiDAO.readById(18);
        assert sensei1.getMissionsCompleted().equals(30);
    }

    @Test
    @Transactional
    public void testSenseiDAOCreate() {
        Sensei sensei = new Sensei();
        senseiDAO.create(sensei);
        assert sensei.getId() != null;
    }

    @Test
    @Transactional
    public void testStudentDAOReadById() {
        Student student = studentDAO.readById(14);
        assert student != null;
    }

    @Test
    @Transactional
    public void testStudentDAORead() {
        List<Student> students = studentDAO.read();
        assert students != null;
    }

    @Test
    @Transactional
    public void testStudentDAODelete() {
        Student student = studentDAO.readById(14);
        studentDAO.delete(student);
        student = studentDAO.readById(14);
        assert student == null;
    }


    @Test
    @Transactional
    public void testStudentDAOUpdate() {
        Student student = studentDAO.readById(14);
        student.setAge(18);
        studentDAO.update(student);
        Student student1 = studentDAO.readById(14);
        assert student1.getAge().equals(18);
    }

    @Test
    @Transactional
    public void testStudentDAOCreate() {
        Student student = new Student();
        studentDAO.create(student);
        assert student.getId() != null;
    }


    @Test
    @Transactional
    public void testMissionServiceReadById() {
        Mission mission = missionService.getById(1);
        assert mission != null;
    }

    @Test
    @Transactional
    public void testMissionServiceRead() {
        List<Mission> missions = missionService.get();
        assert missions != null;
    }

    @Test
    @Transactional
    public void testMissionServiceDelete() {
        Mission mission = missionService.getById(1);
        missionService.delete(mission);
        mission = missionService.getById(1);
        assert mission == null;
    }


    @Test
    @Transactional
    public void testMissionServiceEdit() {
        Mission mission = missionService.getById(1);
        mission.setPrice("100");
        missionService.edit(mission);
        Mission mission1 = missionService.getById(1);
        assert mission1.getPrice().equals("100");
    }

    @Test
    @Transactional
    public void testMissionServiceAdd() {
        Mission mission = new Mission();
        missionService.add(mission);
        assert mission.getId() != null;
    }

    @Test
    @Transactional
    public void testProfileServiceReadById() {
        Profile profile = profileService.getById(7);
        assert profile != null;
    }

    @Test
    @Transactional
    public void testProfileServiceRead() {
        List<Profile> profiles = profileService.get();
        assert profiles != null;
    }

    @Test
    @Transactional
    public void testProfileServiceDelete() {
        Profile profile = profileService.getById(7);
        profileService.delete(profile);
        profile = profileService.getById(7);
        assert profile == null;
    }


    @Test
    @Transactional
    public void testProfileServiceEdit() {
        Profile profile = profileService.getById(7);
        profile.setSkills("none");
        profileService.edit(profile);
        Profile profile1 = profileService.getById(7);
        assert profile1.getSkills().equals("none");
    }

    @Test
    @Transactional
    public void testProfileServiceAdd() {
        Profile profile = new Profile();
        profileService.add(profile);
        assert profile.getId() != null;
    }

    @Test
    @Transactional
    public void testCustomerServiceReadById() {
        Customer customer = customerService.getById("Artem");
        assert customer != null;
    }

    @Test
    @Transactional
    public void testCustomerServiceRead() {
        List<Customer> customers = customerService.get();
        assert customers != null;
    }

    @Test
    @Transactional
    public void testCustomerServiceDelete() {
        Customer customer = customerService.getById("Artem");
        customerService.delete(customer);
        customer = customerService.getById("Artem");
        assert customer == null;
    }


    @Test
    @Transactional
    public void testCustomerServiceEdit() {
        Customer customer = customerService.getById("Artem");
        customer.setPassword("pass");
        customerService.edit(customer);
        Customer customer1 = customerService.getById("Artem");
        assert customer1.getPassword().equals("pass");
    }

    @Test
    @Transactional
    public void testCustomerServiceAdd() {
        Customer customer = new Customer();
        customer.setName("Gachi");
        customerService.add(customer);
        assert customer.getName() != null;
    }

    @Test
    @Transactional
    public void testSenseiServiceReadById() {
        Sensei sensei = senseiService.getById(18);
        assert sensei != null;
    }

    @Test
    @Transactional
    public void testSenseiServiceRead() {
        List<Sensei> senseis = senseiService.get();
        assert senseis != null;
    }

    @Test
    @Transactional
    public void testSenseiServiceDelete() {
        Sensei sensei = senseiService.getById(18);
        senseiService.delete(sensei);
        sensei = senseiService.getById(18);
        assert sensei == null;
    }


    @Test
    @Transactional
    public void testSenseiServiceEdit() {
        Sensei sensei = senseiService.getById(18);
        sensei.setStudent("Ben");
        senseiService.edit(sensei);
        Sensei sensei1 = senseiService.getById(18);
        assert sensei1.getStudent().equals("Ben");
    }

    @Test
    @Transactional
    public void testSenseiServiceAdd() {
        Sensei sensei = new Sensei();
        senseiService.add(sensei);
        assert sensei.getId() != null;
    }


    @Test
    @Transactional
    public void testStudentServiceReadById() {
        Student student = studentService.getById(14);
        assert student != null;
    }

    @Test
    @Transactional
    public void testStudentServiceRead() {
        List<Student> students = studentService.get();
        assert students != null;
    }

    @Test
    @Transactional
    public void testStudentServiceDelete() {
        Student student = studentService.getById(14);
        studentService.delete(student);
        student = studentService.getById(14);
        assert student == null;
    }


    @Test
    @Transactional
    public void testStudentServiceEdit() {
        Student student = studentService.getById(14);
        student.setName("Ben");
        studentService.edit(student);
        Student student1 = studentService.getById(14);
        assert student1.getName().equals("Ben");
    }

    @Test
    @Transactional
    public void testStudentServiceAdd() {
        Student student = new Student();
        studentService.add(student);
        assert student.getId() != null;
    }


    @Test
    public void generateMissionPdf() {
        new PdfGenerator().generateMissions(missionService.get());
        assert new File("C://file/missions.pdf").exists();
    }

    @Test
    public void generateMissionExcel() {
        new ExcelGenerator().generateMissions(missionService.get());
        assert new File("C://file/missions.xls").exists();
    }

    @Test
    public void generateMissionCsv() throws IOException {
        new CsvGenerator<Mission>(Mission.class).generateCSV(missionService.get());
        assert new File("C://file/Missions.txt").exists();
    }

    @Test
    public void generateProfilePdf() {
        new PdfGenerator().generateProfiles(profileService.get());
        assert new File("C://file/profiles.pdf").exists();
    }

    @Test
    public void generateProfileExcel() {
        new ExcelGenerator().generateProfiles(profileService.get());
        assert new File("C://file/profiles.xls").exists();
    }

    @Test
    public void generateProfileCsv() throws IOException {
        new CsvGenerator<Profile>(Profile.class).generateCSV(profileService.get());
        assert new File("C://file/Profiles.txt").exists();
    }

    @Test
    public void generateSenseiPdf() {
        new PdfGenerator().generateSenseis(senseiService.get());
        assert new File("C://file/senseis.pdf").exists();
    }

    @Test
    public void generateSenseiExcel() {
        new ExcelGenerator().generateSenseis(senseiService.get());
        assert new File("C://file/senseis.xls").exists();
    }

    @Test
    public void generateSenseiCsv() throws IOException {
        new CsvGenerator<Sensei>(Sensei.class).generateCSV(senseiService.get());
        assert new File("C://file/Senseis.txt").exists();
    }

    @Test
    public void generateStudentPdf() {
        new PdfGenerator().generateStudents(studentService.get());
        assert new File("C://file/students.pdf").exists();
    }

    @Test
    public void generateStudentExcel() {
        new ExcelGenerator().generateStudents(studentService.get());
        assert new File("C://file/students.xls").exists();
    }

    @Test
    public void generateStudentCsv() throws IOException {
        new CsvGenerator<Student>(Student.class).generateCSV(studentService.get());
        assert new File("C://file/Students.txt").exists();
    }





}
