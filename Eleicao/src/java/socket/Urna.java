package socket;

import java.io.IOException;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONException;

@ServerEndpoint("/urna")
public class Urna {

    private static int[] votos = new int[8];

    @OnOpen
    public void onOpen(Session session) {

    }

    @OnMessage
    public void onMessage(Session session, String partido) throws IOException {

        for (Session s : session.getOpenSessions()) {
            if (s.isOpen()) {
                if (partido != null) {
                    int index = Integer.parseInt(partido);
                    votos[index]++;
                    s.getBasicRemote().sendText(this.listarVoto());
                }
            }
        }
    }

    public String listarVoto() {
        try {
            JSONArray retorno = new JSONArray(votos);
            return retorno.toString();
        } catch (JSONException e) {
            System.out.println("Exception:" + e);;
        }
        return null;
    }
}
