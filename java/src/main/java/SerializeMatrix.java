import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.ArrayList;

public class SerializeMatrix {
    private static String getName(int a) {
        return String.valueOf((char) (a + 65));
    }

    private static JSONObject getNode(int a) {
        JSONObject node = new JSONObject();
        JSONObject nodeData = new JSONObject();

        nodeData.put("id", getName(a));
        node.put("data", nodeData);

        return node;
    }

    private static JSONObject getEdge(int a, int b) {
        JSONObject edge = new JSONObject();
        JSONObject edgeData = new JSONObject();
        String aa = getName(a);
        String bb = getName(b);

        edgeData.put("id", (aa + bb));
        edgeData.put("source", aa);
        edgeData.put("target", bb);
        edge.put("data", edgeData);

        return edge;
    }

    public static String getJson(int[][] aMatrix) {
        int i, j;
        int lines = aMatrix.length;
        int columns = aMatrix[0].length;

        if (lines != columns) {
            System.out.println("ERROR : matrix format");
            return new String();
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

        return anElement.toJSONString();
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
}
