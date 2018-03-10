package by.controller;

import by.json.*;
import by.model.*;
import by.service.*;
import by.generator.CsvGenerator;
import by.generator.ExcelGenerator;
import by.generator.PdfGenerator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.*;
import java.util.List;

@SuppressWarnings("all")
@Controller
@EnableWebMvc
public class MainController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private MissionService missionService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private SenseiService senseiService;

    @Autowired
    private StudentService studentService;

    private static final Logger logger = Logger.getLogger(MainController.class);


    @RequestMapping(value = "/addMission", method = RequestMethod.POST)
    public @ResponseBody Customer addMission(@RequestBody MissionJSON missionJSON) {
        Mission mission = missionJSON.getMission();
        mission.setCustomer(missionJSON.getUser());
        missionService.add(mission);
        Customer customer = customerService.getById(missionJSON.getUser().getName());
        return customer;
    }


    @RequestMapping(value = "/updateMission", method = RequestMethod.POST)
    public @ResponseBody Customer editMission(@RequestBody MissionEditJSON missionJSON) {
        Mission mission = missionJSON.getNewMission();
        mission.setId(missionJSON.getId());
        mission.setCustomer(missionJSON.getUser());
        missionService.edit(mission);
        Customer customer = customerService.getById(missionJSON.getUser().getName());
        return customer;
    }

    @RequestMapping(value = "/deleteMission", method = RequestMethod.POST)
    public @ResponseBody Customer deleteMission(@RequestBody MissionDeleteJSON missionJSON) {
        Mission mission = missionService.getById(missionJSON.getId());
        missionService.delete(mission);
        Customer customer = customerService.getById(missionJSON.getUser().getName());
        return customer;
    }

    @RequestMapping(value = "/addProfile", method = RequestMethod.POST)
    public @ResponseBody List<Profile> addProfile(@RequestBody ProfileJSON profileJSON) {
        Profile profile = profileJSON.getProfile();
        if (profileService.getBySensei(profile.getSenseiName()) == null)
            profileService.add(profile);
        return profileService.get();
    }

    @RequestMapping(value = "/deleteProfile", method = RequestMethod.POST)
    public @ResponseBody List<Profile> deleteProfile(@RequestBody DeleteJSON profileJSON) {
        profileService.delete(profileService.getById(profileJSON.getId()));
        return profileService.get();
    }

    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
    public @ResponseBody List<Profile> updateProfile(@RequestBody ProfileEditJSON profileJSON) {
        Profile profile = profileJSON.getNewProfile();
        profile.setId(profileJSON.getId());
        profileService.edit(profile);
        return profileService.get();
    }


    @RequestMapping(value = "/addSensei", method = RequestMethod.POST)
    public @ResponseBody List<Sensei> addSensei(@RequestBody SenseiJSON senseiJSON) {
        logger.info(senseiJSON.getSensei());

        Student student = studentService.getByName(senseiJSON.getSensei().getStudent());
        if (student != null) {
            student.setSenseiName(senseiJSON.getSensei().getName());
            studentService.edit(student);
        }

        Sensei sensei = senseiService.getByStudent(senseiJSON.getSensei().getStudent());
        if (sensei != null) {
            sensei.setStudent("none");
            senseiService.edit(sensei);
        }

        senseiService.add(senseiJSON.getSensei());
        return senseiService.get();
    }

    @RequestMapping(value = "/deleteSensei", method = RequestMethod.POST)
    public @ResponseBody List<Sensei> deleteSensei(@RequestBody DeleteJSON senseiJSON) {
        Sensei sensei = senseiService.getById(senseiJSON.getId());
        senseiService.delete(sensei);
        Profile profile = profileService.getBySensei(sensei.getName());
        if (profile != null) {
            profile.setSenseiName("none");
            profileService.edit(profile);
        }
        List<Mission> missions = missionService.getBySensei(sensei.getName());
        for (Mission mission : missions) {
            mission.setSensei("none");
            missionService.edit(mission);
        }

        Student student = studentService.getBySensei(sensei.getName());
        if (student != null) {
            student.setSenseiName("none");
            studentService.edit(student);
        }

        return senseiService.get();
    }

    @RequestMapping(value = "/updateSensei", method = RequestMethod.POST)
    public @ResponseBody List<Sensei> updateSensei(@RequestBody SenseiEditJSON senseiJSON) {
        Sensei oldSensei = senseiService.getById(senseiJSON.getId());
        Sensei sensei = senseiJSON.getNewSensei();
        sensei.setId(senseiJSON.getId());
        Student student = studentService.getBySensei(oldSensei.getName());
        if (student != null) {
            student.setSenseiName(sensei.getName());
            studentService.edit(student);
        }

        Profile profile = profileService.getBySensei(oldSensei.getName());
        if (profile != null) {
            profile.setSenseiName(sensei.getName());
            profileService.edit(profile);
        }
        List<Mission> missions = missionService.getBySensei(oldSensei.getName());
        for (Mission mission : missions) {
            mission.setSensei(sensei.getName());
            missionService.edit(mission);
        }

        senseiService.edit(sensei);
        return senseiService.get();
    }

    @RequestMapping(value = "/addStudent", method = RequestMethod.POST)
    public @ResponseBody List<Student> addStudent(@RequestBody StudentJSON studentJSON) {


        Sensei sensei = senseiService.getByName(studentJSON.getStudent().getSenseiName());
        if (sensei != null) {
            sensei.setStudent(studentJSON.getStudent().getName());
            senseiService.edit(sensei);
        }
        Student student = studentService.getBySensei(studentJSON.getStudent().getSenseiName());
        if (student != null) {
            student.setSenseiName("none");
            studentService.edit(student);
        }

        studentService.add(studentJSON.getStudent());
        return studentService.get();
    }

    @RequestMapping(value = "/deleteStudent", method = RequestMethod.POST)
    public @ResponseBody List<Student> deleteStudent(@RequestBody DeleteJSON studentJSON) {
        Sensei sensei = senseiService.getByStudent(studentService.getById(studentJSON.getId()).getName());
        if (sensei != null) {
            sensei.setStudent("none");
            senseiService.edit(sensei);
        }
        studentService.delete(studentService.getById(studentJSON.getId()));
        return studentService.get();
    }

    @RequestMapping(value = "/updateStudent", method = RequestMethod.POST)
    public @ResponseBody List<Student> updateStudent(@RequestBody StudentEditJSON studentJSON) {
        Student oldStudent = studentService.getById(studentJSON.getId());
        Student student = studentJSON.getNewStudent();
        student.setId(studentJSON.getId());

        Sensei sensei = senseiService.getByStudent(oldStudent.getName());
        if (sensei != null) {
            sensei.setStudent(student.getName());
            senseiService.edit(sensei);
        }


        studentService.edit(student);
        return studentService.get();
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestBody Customer customer) {
        customer.setIsAdmin(false);
        customerService.add(customer);
        return "kek";
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody Customer user(@RequestParam(name="name") String name, @RequestParam(name="password")String password) {
        Customer customer = customerService.getById(name);
        logger.info(customer);
        if (customer != null) {
            if (customer.getPassword().equals(password)) {
                return customer;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/initialRequest", method = RequestMethod.GET, produces = "application/json" )
    public @ResponseBody InitialJSON initial() {
        InitialJSON json = new InitialJSON();
        List<Profile> profiles = profileService.get();
        List<Sensei> senseis = senseiService.get();
        List<Student> students = studentService.get();
        json.setProfiles(profiles);
        json.setSenseis(senseis);
        json.setStudents(students);
        return json;
    }

    @RequestMapping(value = "/data", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody DataJSON getData(@RequestParam(name="name") String name) {
        DataJSON dataJSON = new DataJSON();
        dataJSON.setUser(customerService.getById(name));
        dataJSON.setProfiles(profileService.get());
        dataJSON.setSenseis(senseiService.get());
        dataJSON.setStudents(studentService.get());
        return dataJSON;
    }


    @RequestMapping(value = "/generateMissionsPdf", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getMissionPdfFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new PdfGenerator().generateMissions(missionService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("missions.pdf");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateProfilesPdf", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getProfilePdfFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new PdfGenerator().generateProfiles(profileService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("profiles.pdf");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateSenseisPdf", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getSenseiPdfFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new PdfGenerator().generateSenseis(senseiService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("senseis.pdf");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateStudentsPdf", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getStudentPdfFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new PdfGenerator().generateStudents(studentService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("students.pdf");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateMissionsExcel", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getMissionExcelFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new ExcelGenerator().generateMissions(missionService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("missions.xls");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateProfilesExcel", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getProfileExcelFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new ExcelGenerator().generateProfiles(profileService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("profiles.xls");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateSenseisExcel", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getSenseiExcelFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new ExcelGenerator().generateSenseis(senseiService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("senseis.xls");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateStudentsExcel", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getStudentExcelFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new ExcelGenerator().generateStudents(studentService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("students.xls");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateMissionsCsv", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getMissionsCsvFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new CsvGenerator<Mission>(Mission.class).generateCSV(missionService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("Missions.txt");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateProfilesCsv", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getProfilesCsvFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new CsvGenerator<Profile>(Profile.class).generateCSV(profileService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("Profiles.txt");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateSenseisCsv", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getSenseisCsvFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new CsvGenerator<Sensei>(Sensei.class).generateCSV(senseiService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("Senseis.txt");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }

    @RequestMapping(value = "/generateStudentsCsv", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getStudentsCsvFile(@RequestParam(value="fileName", required=false) String fileName) throws IOException {

        new CsvGenerator<Student>(Student.class).generateCSV(studentService.get());
        ResponseEntity respEntity = null;
        try {
            respEntity = checkEntity("Students.txt");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return respEntity;
    }


    public ResponseEntity checkEntity(String filename) throws Exception {
        byte[] reportBytes = null;
        File result=new File("C://file/" + filename);
        if(result.exists()){
            InputStream inputStream = new FileInputStream("C://file/" + filename);
            byte[] out = org.apache.commons.io.IOUtils.toByteArray(inputStream);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("content-disposition", "attachment; filename=" + filename);
            return new ResponseEntity(out, responseHeaders, HttpStatus.OK);
        } else {
            return new ResponseEntity ("File Not Found", HttpStatus.OK);
        }
    }

}
