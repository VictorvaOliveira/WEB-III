/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package websocket;

import java.io.IOException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author ALUNO
 */
@ServerEndpoint("/sala/{room}")
public class Endpoint {

    @OnOpen
    public void onOpen(Session session, @PathParam("room") String room) {
        System.out.println("Conexão aberta.");
        session.getUserProperties().put("room", room);
    }

    @OnMessage
    public void onMessage(Session session, String msg) throws IOException {
        System.out.println("Conexão em andamento:" + msg);
        int quantidadeSessao = session.getOpenSessions().size();
        String json = "{\"cell\":\"" + 1 + "\",\"counter\":\"" + 10 + "\",\"quantidade\":\"" + quantidadeSessao + "\"}";
        String limiteDeJogador = "{\"message\":\"Atingiu o limite de jogadores\"}";
        
        String room = (String) session.getUserProperties().get("room");
        
        if (quantidadeSessao < 3) {
            try {
                for (Session s : session.getOpenSessions()) {
                    if (s.isOpen() && room.equals(s.getUserProperties().get("room"))) {
                        s.getBasicRemote().sendText(json);
                    }
                }
            } catch (IOException e) {
                System.out.println("Exception:" + e);
            }
        }else{
            session.getBasicRemote().sendText(limiteDeJogador);
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("Conexão fechada.");
    }
}
