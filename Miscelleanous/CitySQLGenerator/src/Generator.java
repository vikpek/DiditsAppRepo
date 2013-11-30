/**
 * Generator in CitySQLGenerator
 * User: Viktor Pekar
 * Date: 13.06.13 16:26
 */
package de.didits.geographicalQueries;

import java.io.*;
import java.util.Scanner;
import java.util.regex.Pattern;

public class Generator {

    public static void main(String[] args) throws IOException {

        String[] line = null;
        Scanner scanner = new Scanner(new File("full.txt"));
        int counter = 0;


        FileInputStream fstream = new FileInputStream("full.txt");
        // Get the object of DataInputStream
        DataInputStream in = new DataInputStream(fstream);
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        String strLine;
        //Read File Line By Line
        while ((strLine = br.readLine()) != null) {

            StringBuffer string = new StringBuffer();
            line = strLine.split(Pattern.quote(","));
            int populationCount = 0;
            if (line[4].length() > 0) {
                populationCount = Integer.parseInt(line[4]);
            }

            if (populationCount > 50000) {
                string.append("INSERT INTO didit (country, city, city_accent, region, population, latitude, " +
                        "longitude) VALUES (");

                for (int i = 0; i < line.length - 1; i++) {
                    string.append("'" + line[i] + "', ");

                }

                if (counter % 100000 == 0) {
                    System.out.println(counter);
                }
                string.append("'" + line[6] + "'");
                string.append(");\n");

                FileWriter writer = new FileWriter("/Users/vikpek/Downloads/CityQueries.txt",/* append */true);

                writer.write(string.toString());

                writer.close();
            }
            counter++;
        }
        System.out.println(counter + " staedte eingelesen.");
        scanner.close();
    }
}