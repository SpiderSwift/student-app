package by.generator;

import by.model.Mission;
import by.model.Profile;
import by.model.Sensei;
import by.model.Student;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;


@SuppressWarnings("all")
public class ExcelGenerator {

    public void generateMissions(List<Mission> missions) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Missions");
        Row row = sheet.createRow(0);
        Cell headerCell = row.createCell(0);
        headerCell.setCellValue("id");
        headerCell = row.createCell(1);
        headerCell.setCellValue("price");
        headerCell = row.createCell(2);
        headerCell.setCellValue("rank");
        headerCell = row.createCell(3);
        headerCell.setCellValue("description");
        headerCell = row.createCell(4);
        headerCell.setCellValue("sensei");
        int rownum = 1;
        for (Mission mission : missions) {
            row = sheet.createRow(rownum++);
            int cellnum = 0;
            Cell cell = row.createCell(cellnum++);
            cell.setCellValue(mission.getId());
            cell = row.createCell(cellnum++);
            cell.setCellValue(mission.getPrice());
            cell = row.createCell(cellnum++);
            cell.setCellValue(mission.getRank());
            cell = row.createCell(cellnum++);
            cell.setCellValue(mission.getDescription());
            cell = row.createCell(cellnum);
            cell.setCellValue(mission.getSensei());
        }
        try {
            FileOutputStream out = new FileOutputStream(new File("C://file/missions.xls"));
            workbook.write(out);
            out.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void generateSenseis(List<Sensei> senseis) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Senseis");
        Row row = sheet.createRow(0);
        Cell headerCell = row.createCell(0);
        headerCell.setCellValue("id");
        headerCell = row.createCell(1);
        headerCell.setCellValue("name");
        headerCell = row.createCell(2);
        headerCell.setCellValue("missionsCompleted");
        headerCell = row.createCell(3);
        headerCell.setCellValue("student");
        headerCell = row.createCell(4);
        int rownum = 1;
        for (Sensei sensei : senseis) {
            row = sheet.createRow(rownum++);
            int cellnum = 0;
            Cell cell = row.createCell(cellnum++);
            cell.setCellValue(sensei.getId());
            cell = row.createCell(cellnum++);
            cell.setCellValue(sensei.getName());
            cell = row.createCell(cellnum++);
            cell.setCellValue(sensei.getMissionsCompleted());
            cell = row.createCell(cellnum);
            cell.setCellValue(sensei.getStudent());
        }
        try {
            FileOutputStream out = new FileOutputStream(new File("C://file/senseis.xls"));
            workbook.write(out);
            out.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void generateStudents(List<Student> students) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Students");
        Row row = sheet.createRow(0);
        Cell headerCell = row.createCell(0);
        headerCell.setCellValue("id");
        headerCell = row.createCell(1);
        headerCell.setCellValue("name");
        headerCell = row.createCell(2);
        headerCell.setCellValue("age");
        headerCell = row.createCell(3);
        headerCell.setCellValue("senseiName");
        headerCell = row.createCell(4);
        int rownum = 1;
        for (Student student : students) {
            row = sheet.createRow(rownum++);
            int cellnum = 0;
            Cell cell = row.createCell(cellnum++);
            cell.setCellValue(student.getId());
            cell = row.createCell(cellnum++);
            cell.setCellValue(student.getName());
            cell = row.createCell(cellnum++);
            cell.setCellValue(student.getAge());
            cell = row.createCell(cellnum);
            cell.setCellValue(student.getSenseiName());
        }
        try {
            FileOutputStream out = new FileOutputStream(new File("C://file/students.xls"));
            workbook.write(out);
            out.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void generateProfiles(List<Profile> profiles) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Profiles");
        Row row = sheet.createRow(0);
        Cell headerCell = row.createCell(0);
        headerCell.setCellValue("id");
        headerCell = row.createCell(1);
        headerCell.setCellValue("senseiName");
        headerCell = row.createCell(2);
        headerCell.setCellValue("iq");
        headerCell = row.createCell(3);
        headerCell.setCellValue("power");
        headerCell = row.createCell(4);
        headerCell.setCellValue("rank");
        headerCell = row.createCell(5);
        headerCell.setCellValue("skills");
        int rownum = 1;
        for (Profile profile : profiles) {
            row = sheet.createRow(rownum++);
            int cellnum = 0;
            Cell cell = row.createCell(cellnum++);
            cell.setCellValue(profile.getId());
            cell = row.createCell(cellnum++);
            cell.setCellValue(profile.getSenseiName());
            cell = row.createCell(cellnum++);
            cell.setCellValue(profile.getIq());
            cell = row.createCell(cellnum++);
            cell.setCellValue(profile.getPower());
            cell = row.createCell(cellnum++);
            cell.setCellValue(profile.getRank());
            cell = row.createCell(cellnum);
            cell.setCellValue(profile.getSkills());
        }
        try {
            FileOutputStream out = new FileOutputStream(new File("C://file/profiles.xls"));
            workbook.write(out);
            out.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}
