/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servers;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author victor
 */
@WebServlet(name = "Server", urlPatterns = {"/Server"})
public class Server extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String nome = request.getParameter("nome");
        String idade = request.getParameter("idade");
        response.setContentType("text/plain");
        response.getWriter().write("(Via Get)Nome:" + nome + "<br/>Idade: " + idade);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String nome = request.getParameter("nome");
        String idade = request.getParameter("idade");
        response.setContentType("text/plain");
        response.getWriter().write("(Via Post)Nome:" + nome + "<br/>Idade: " + idade);
    }

}
