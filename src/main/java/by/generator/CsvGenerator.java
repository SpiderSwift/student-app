package by.generator;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class CsvGenerator<T> {

    private Class<T> clazz;

    public CsvGenerator(Class<T> clazz) {
        this.clazz = clazz;
    }

    public void generateCSV(List<T> items) throws IOException {
        PrintWriter out = new PrintWriter("C://file/" + clazz.getSimpleName() +"s.txt");
        for (T t : items) {
            out.println(t + "\n");
        }
        out.close();
    }
}
