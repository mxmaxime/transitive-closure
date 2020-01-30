import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] aMatrix = {
            {0, 1, 0},
            {0, 1, 0},
            {0, 1, 0}
        };

        String tmp = SerializeMatrix.getJson(aMatrix);
        int[][] aMatrix1 = SerializeMatrix.getMatrix(tmp);

        System.out.println("Json obtenu :");
        System.out.println(tmp);

        System.out.println("Matrice obtenue :");
        for (int i = 0; i < aMatrix.length; i++) {
            System.out.println(Arrays.toString(aMatrix1[i]));
        }
    }
}
