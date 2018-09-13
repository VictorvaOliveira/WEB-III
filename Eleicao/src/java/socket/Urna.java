package socket;

import java.io.IOException;
import javax.websocket.OnClose;
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
        System.out.println("Abrindo conexão");
    }

    @OnMessage
    public void onMessage(Session session, String partido) throws IOException {

        for (Session s : session.getOpenSessions()) {
            if (s.isOpen()) {
                if (partido != null) {
                    int index = Integer.parseInt(partido);
                    int x = 1 + (int) (Math.random() * 100);
                    switch (index) {
                        case 0:
                            votos[index] += (int) Math.round(Math.pow(1.1, x));
                            break;
                        case 1:
                            votos[index] += (int) Math.round(Math.log10(x) / Math.log10(1.0005));
                            break;
                        case 2:
                            votos[index] += 70 * x;
                            break;
                        case 3:
                            votos[index] += (int) Math.round(6500 * Math.sin(x / 57.3));
                            break;
                        case 4:
                            votos[index] += 35 * x + 150;
                            break;
                        case 5:
                            votos[index] += (int) Math.round((5 * x) * (Math.log(x)));
                            break;
                        case 6:
                            votos[index] += 8 * x;
                            break;
                        case 7:
                            votos[index] += 28 * x;
                            break;
                        default:
                            break;
                    }
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
    
    @OnClose
    public void onClose(Session session) {
        System.out.println("Close");
    }
}
