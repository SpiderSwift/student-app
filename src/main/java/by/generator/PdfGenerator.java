package by.generator;

import by.model.Mission;
import by.model.Profile;
import by.model.Sensei;
import by.model.Student;
import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SuppressWarnings("all")
public class PdfGenerator {

    private int yOff = 750;
    private final PDFont courierBoldFont = PDType1Font.COURIER_BOLD;
    private final PDFont courierFont = PDType1Font.HELVETICA;

    public void generateMissions(List<Mission> missions) {
        int missionCount = 1;
        final PDDocument document = new PDDocument();
        try {
            for (Mission mission : missions) {
                final PDPage singlePage = new PDPage();
                document.addPage(singlePage);

                //-----
                InputStream oldContentStream = singlePage.getContents();
                byte[] ba = IOUtils.toByteArray(oldContentStream);
                oldContentStream.close();
                PDPageContentStream newContentStream = new PDPageContentStream(document, singlePage, false, true);
                PDImageXObject pdImage = PDImageXObject.createFromFile("C://file/5.2.png", document);
                newContentStream.saveGraphicsState();
                newContentStream.drawImage(pdImage, 0, 0);
                newContentStream.restoreGraphicsState();
                newContentStream.close();
                PDPageContentStream contentStream = new PDPageContentStream(document, singlePage, true, true);
                contentStream.appendRawCommands(ba);

                //-----


                //final PDPageContentStream contentStream = new PDPageContentStream(document, singlePage);
                yOff = 750;
                printText(contentStream, "Mission " + missionCount++, 30, courierBoldFont);
                printText(contentStream, "Id: " + mission.getId(), 20, courierFont);
                printText(contentStream, "Rank: " + mission.getRank(), 20, courierFont);
                printText(contentStream, "Price:" + mission.getPrice(), 20, courierFont);
                printText(contentStream, "Description:" + mission.getDescription(), 20, courierFont);
                printText(contentStream, "Sensei:" + mission.getSensei(), 20, courierFont);
                contentStream.close();
            }
            document.save("C://file/missions.pdf");
            document.close();
        } catch (IOException ignored) {

        }
    }

    public void generateProfiles(List<Profile> profiles) {
        int count = 1;
        final PDDocument document = new PDDocument();
        try {
            for (Profile profile : profiles) {
                final PDPage singlePage = new PDPage();
                document.addPage(singlePage);
                //-----
                InputStream oldContentStream = singlePage.getContents();
                byte[] ba = IOUtils.toByteArray(oldContentStream);
                oldContentStream.close();
                PDPageContentStream newContentStream = new PDPageContentStream(document, singlePage, false, true);
                PDImageXObject pdImage = PDImageXObject.createFromFile("C://file/5.2.png", document);
                newContentStream.saveGraphicsState();
                newContentStream.drawImage(pdImage, 0, 0);
                newContentStream.restoreGraphicsState();
                newContentStream.close();
                PDPageContentStream contentStream = new PDPageContentStream(document, singlePage, true, true);
                contentStream.appendRawCommands(ba);

                //-----
                yOff = 750;
                printText(contentStream, "Profile " + count++, 30, courierBoldFont);
                printText(contentStream, "Id: " + profile.getId(), 20, courierFont);
                printText(contentStream, "Sensei: " + profile.getSenseiName(), 20, courierFont);
                printText(contentStream, "Iq:" + profile.getIq(), 20, courierFont);
                printText(contentStream, "Power:" + profile.getPower(), 20, courierFont);
                printText(contentStream, "Rank:" + profile.getRank(), 20, courierFont);
                printText(contentStream, "Skills:" + profile.getSkills(), 20, courierFont);
                contentStream.close();
            }
            document.save("C://file/profiles.pdf");
            document.close();
        } catch (IOException ignored) {

        }
    }

    public void generateStudents(List<Student> students) {
        int count = 1;
        final PDDocument document = new PDDocument();
        try {
            for (Student student : students) {
                final PDPage singlePage = new PDPage();
                document.addPage(singlePage);
                //-----
                InputStream oldContentStream = singlePage.getContents();
                byte[] ba = IOUtils.toByteArray(oldContentStream);
                oldContentStream.close();
                PDPageContentStream newContentStream = new PDPageContentStream(document, singlePage, false, true);
                PDImageXObject pdImage = PDImageXObject.createFromFile("C://file/5.2.png", document);
                newContentStream.saveGraphicsState();
                newContentStream.drawImage(pdImage, 0, 0);
                newContentStream.restoreGraphicsState();
                newContentStream.close();
                PDPageContentStream contentStream = new PDPageContentStream(document, singlePage, true, true);
                contentStream.appendRawCommands(ba);

                //-----
                yOff = 750;
                printText(contentStream, "Student " + count++, 30, courierBoldFont);
                printText(contentStream, "Id: " + student.getId(), 20, courierFont);
                printText(contentStream, "Name: " + student.getName(), 20, courierFont);
                printText(contentStream, "Age:" + student.getAge(), 20, courierFont);
                printText(contentStream, "Sensei:" + student.getSenseiName(), 20, courierFont);
                contentStream.close();
            }
            document.save("C://file/students.pdf");
            document.close();
        } catch (IOException ignored) {

        }
    }

    public void generateSenseis(List<Sensei> senseis) {
        int count = 1;
        final PDDocument document = new PDDocument();
        try {
            for (Sensei sensei : senseis) {
                final PDPage singlePage = new PDPage();
                document.addPage(singlePage);
                //-----
                InputStream oldContentStream = singlePage.getContents();
                byte[] ba = IOUtils.toByteArray(oldContentStream);
                oldContentStream.close();
                PDPageContentStream newContentStream = new PDPageContentStream(document, singlePage, false, true);
                PDImageXObject pdImage = PDImageXObject.createFromFile("C://file/5.2.png", document);
                newContentStream.saveGraphicsState();
                newContentStream.drawImage(pdImage, 0, 0);
                newContentStream.restoreGraphicsState();
                newContentStream.close();
                PDPageContentStream contentStream = new PDPageContentStream(document, singlePage, true, true);
                contentStream.appendRawCommands(ba);

                //-----
                yOff = 750;
                printText(contentStream, "Student " + count++, 30, courierBoldFont);
                printText(contentStream, "Id: " + sensei.getId(), 20, courierFont);
                printText(contentStream, "Name: " + sensei.getName(), 20, courierFont);
                printText(contentStream, "Missions completed:" + sensei.getMissionsCompleted(), 20, courierFont);
                printText(contentStream, "Student:" + sensei.getStudent(), 20, courierFont);
                contentStream.close();
            }
            document.save("C://file/senseis.pdf");
            document.close();
        } catch (IOException ignored) {

        }
    }


    private void printText(PDPageContentStream contentStream, String text, int fontSize, PDFont font) throws IOException {
        contentStream.beginText();
        contentStream.setFont(courierBoldFont, fontSize);
        contentStream.newLineAtOffset(25, yOff);
        contentStream.showText(text);
        contentStream.newLine();
        contentStream.endText();
        yOff -= 60;
    }


}
