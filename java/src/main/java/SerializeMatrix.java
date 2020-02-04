import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SerializeMatrix {
    private static JSONObject getNode(int a) {
        JSONObject node = new JSONObject();
        JSONObject nodeData = new JSONObject();

        nodeData.put("id", new String("" + a));
        node.put("data", nodeData);

        return node;
    }

    private static JSONObject getEdge(int a, int b) {
        JSONObject edge = new JSONObject();
        JSONObject edgeData = new JSONObject();

        edgeData.put("id", new String(a + "-" + b));
        edgeData.put("source", new String("" + a));
        edgeData.put("target", new String("" + b));
        edge.put("data", edgeData);

        return edge;
    }

    public static JSONObject getMatrixJsonFormat(int [][] aMatrix) {
        int i, j;
        int lines = aMatrix.length;
        int columns = aMatrix[0].length;

        if (lines != columns) {
            System.out.println("ERROR : matrix format");
            return null;
        }

        JSONObject anElement = new JSONObject();
        JSONArray nodes = new JSONArray();
        JSONArray edges = new JSONArray();

        for (i = 0; i < lines; i++) {
            nodes.add(getNode(i));
        }

        anElement.put("nodes", nodes);

        for (i = 0; i < lines; i++) {
            for (j = 0; j < lines; j++) {
                if (aMatrix[i][j] == 1) {
                    edges.add(getEdge(i, j));
                }
            }
        }
        anElement.put("edges", edges);

        return anElement;
    }

    public static String getJson(int[][] aMatrix) {
        return getMatrixJsonFormat(aMatrix).toJSONString();
    }

    /**
     * UNSERIALIZE
     */
    private static ArrayList<String> getVerteces (JSONArray anArray) {
        ArrayList<String> verteces = new ArrayList<String>();
        JSONObject data;
        String vertex;
        for (Object obj : anArray) {
            data = (JSONObject) ((JSONObject) obj).get("data");
            vertex = (String) data.get("id");
            verteces.add(vertex);
        }

        return verteces;
    }

    public static int[][] getMatrix(String jsonString) {
        JSONParser parser = new JSONParser();
        JSONObject elements;
        try {
            elements = (JSONObject) parser.parse(jsonString);
        } catch (ParseException exept) {
            System.out.println("Message " + exept.toString());
            return null;
        }

        JSONArray nodes = (JSONArray) elements.get("nodes");
        ArrayList<String> verteces = getVerteces(nodes);

        int matrixSize = verteces.size();
        int[][] retMatrix = new int[matrixSize][matrixSize];
        String source, target;
        int x,y;
        JSONArray edges = (JSONArray) elements.get("edges");
        JSONObject data;
        for (Object obj : edges) {
            data = (JSONObject) ((JSONObject) obj).get("data");
            source = (String) data.get("source");
            target = (String) data.get("target");
            x = verteces.indexOf(source);
            y = verteces.indexOf(target);
            retMatrix[x][y] = 1;
        }

        return retMatrix;
    }

    public static int[][] raf(String tmpString) {
        JSONParser parser = new JSONParser();
        JSONArray matrixList = new JSONArray();
        JSONArray aLine = new JSONArray();
        try {
            matrixList = (JSONArray) parser.parse(tmpString);
        } catch (ParseException exept) {
            System.out.println("Message " + exept.toString());
        }
        int width, height;
        int i, j;
        int [][] matrix = new int[matrixList.size()][((JSONArray)matrixList.get(0)).size()];
        for (i = 0; i < matrixList.size(); i++) {
            aLine = (JSONArray) matrixList.get(i);
            for (j = 0; j < aLine.size(); j++) {
                matrix[i][j] = ((Long)aLine.get(j)).intValue();
            }
        }
        return matrix;
    }

    public static String osef(List<Matrice> matrixList) {
        Matrice original = matrixList.remove(0);
        JSONObject transitiveClosure = new JSONObject();
        transitiveClosure.put("original_matrix", Arrays.deepToString(original.getTab()));
        transitiveClosure.put("original_lib", SerializeMatrix.getMatrixJsonFormat(original.getTab()));

        if (!matrixList.isEmpty()) {
            int[][][] stepMatrices = new int[matrixList.size()][matrixList.get(0).getTab().length][];
            for (int i = 0; i < matrixList.size(); i++) {
                stepMatrices[i] = matrixList.get(i).getTab();
            }
            transitiveClosure.put("steps_matrix", Arrays.deepToString(stepMatrices));
        } else {
            transitiveClosure.put("steps_matrix", "[]");
        }


        return transitiveClosure.toJSONString();
    }
}
