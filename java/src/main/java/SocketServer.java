import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

import java.io.*;
import java.util.List;

public class SocketServer {

    private ServerSocket serverSocket;
    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;

    public void start(int port) throws IOException
    {
        //create the socket server object
        serverSocket = new ServerSocket(port);

        while(true) {
            clientSocket = serverSocket.accept();
            out = new PrintWriter(clientSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

            String inputLine;

            while((inputLine = in.readLine()) != null) {
                // get data from NodeJS socket (supposed to be a matrix [[]] if Maxime doesn't suck)
                // otherwise go kill him.
                System.out.println("message received:" + inputLine);

                // Lorianu will work here.

                int [][] tabMatrix = SerializeMatrix.raf(inputLine);
                List<Matrice> steps = (new FermetureTransitive(tabMatrix)).getMatrice();
                //System.out.println(SerializeMatrix.osef(steps));

                // send data to NodeJS socket
                out.println(SerializeMatrix.osef(steps));
            }
        }

    }

    public void stop() throws IOException
    {
        in.close();
        out.close();
        clientSocket.close();
        serverSocket.close();
    }


    public static void main(String[] args) throws IOException {
        SocketServer server = new SocketServer();
        server.start(6969);
    }

}
