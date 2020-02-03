import org.json.simple.JSONObject;

import java.util.Arrays;

public class DataTest {
    public static String get() {
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
        System.out.println(Arrays.deepToString(aMatrix1));

        JSONObject edge = new JSONObject();
        int original[][] = {
                {0, 1, 0, 1, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 1},
                {0, 0, 0, 0, 0, 0, 1},
                {0, 0, 0, 0, 1, 1, 0},
                {0, 0, 0, 0, 0, 1, 0},
                {0, 0, 0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 1, 0}
        };
        int minimum[][] = {
                {0, 1, 0, 1, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 0, 1},
                {0, 0, 0, 0, 1, 0, 0},
                {0, 0, 0, 0, 0, 1, 0},
                {0, 0, 0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 1, 0}
        };
        int fermetureTransitive[][] = {
                {0, 1, 1, 1, 1, 1, 1},
                {0, 0, 1, 0, 0, 1, 1},
                {0, 0, 0, 0, 0, 0, 1},
                {0, 0, 0, 0, 1, 1, 0},
                {0, 0, 0, 0, 0, 1, 0},
                {0, 0, 0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 1, 0}
        };

        int [][][] steps = {
                {
                        {0, 0, 1, 0, 1, 1, 1},
                        {0, 0, 0, 0, 0, 1, 1},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 1, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0}
                },
                {
                        {0, 0, 0, 0, 0, 1, 1},
                        {0, 0, 0, 0, 0, 1, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0}
                },
                {
                        {0, 0, 0, 0, 0, 1, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0}
                },
                {
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0},
                        {0, 0, 0, 0, 0, 0, 0}
                }
        };
        edge.put("original_matrix", Arrays.deepToString(original));
        edge.put("original_lib", SerializeMatrix.getMatrixJsonFormat(original));
        edge.put("minimum_lib", SerializeMatrix.getMatrixJsonFormat(minimum));
        edge.put("steps_matrix", Arrays.deepToString(steps));
        return edge.toJSONString();
    }
}
