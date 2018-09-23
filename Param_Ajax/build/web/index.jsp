<%-- 
    Document   : index
    Created on : 22/09/2018, 16:49:12
    Author     : victor
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="index.js"></script>
        <script type="text/javascript" src="jquery.min.js"></script>
        <title>Param Ajax</title>
    </head>
    <body>
        <h1>Passando paramêtro</h1>
        
        <form method="get">
            <input type ="text" id="nome"/>
            <input type="number" id="idade" step="1" min="0"/>
            <input id="btn" type="button" value='Passar paramêtro' onclick="viaGet()"/>
            <input id="btn_post" type="button" value="Passar paramêtro via Post" onclick="viaPost()"/>
        </form>
        
        <p id="message"></p>
    </body>
</html>
