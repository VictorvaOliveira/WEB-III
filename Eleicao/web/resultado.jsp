<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--<script type="text/javascript" src="resultado.js"></script>-->
        <script type="text/javascript" src="robot.js"></script>
        <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
        <link rel="stylesheet" type="text/css" href="resultado.css"/>
        <title>Votação</title>
    </head>
    <body>
        <fieldset id="iniciando">
            <legend>Urna Eleitoral</legend>
            <button id="start" type="submit">
                Iniciar votação
            </button>
        </fieldset>
        <fieldset id="output">
            <legend>Resultado da eleição:</legend>
            <ul>
                <c:forTokens items="${initParam['partidos']}" delims="," var="partidos" varStatus="status">
                    <li>Partido<span id="index"/> &ndash;<span class="voto">&nbsp;</span><br />
                        <meter min="0" max="100">&ndsp;</meter><span class="percent">&nbsp;</span>
                    </li>
                </c:forTokens>
            </ul>
            <p>Total de votos:<span id="total">0</span>.</p>
            
        </fieldset>
    </body>
</html>
