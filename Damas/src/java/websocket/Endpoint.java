/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author ALUNO
 */
@ServerEndpoint("/sala/{room}")
public class Endpoint {

    public static List<Session> jogadores = new ArrayList<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("room") String room) {
        System.out.println("Conexão aberta (/session/room)");
        jogadores.add(session);
        session.getUserProperties().put("room", room);
    }

    @OnMessage
    public void onMessage(Session session, String text) throws IOException, JSONException {
        System.out.println("Conexão em andamento");
        String json = "{\"jogador\":\"" + jogadores.size() + "\"}";
        String json2 = "{\"message\":\"Atingiu o limite de jogadores\"}";

        String room = (String) session.getUserProperties().get("room");
        if (jogadores.size() < 3) {
            try {
                for (Session s : session.getOpenSessions()) {
                    if (s.isOpen() && room.equals(s.getUserProperties().get("room"))) {
                        s.getBasicRemote().sendText(json);
                    }
                }
            } catch (IOException e) {
                Logger.getLogger(Endpoint.class.getName()).log(Level.SEVERE, null, e);
            }
        } else {
            session.getBasicRemote().sendText(json2);
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
//        Session s = (Session) session.getUserProperties().get("room");
//        s.close();
        System.out.println("Conexão fechada.");
    }
}
