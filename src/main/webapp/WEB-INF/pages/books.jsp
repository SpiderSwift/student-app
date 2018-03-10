<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<style type="text/css">
    TABLE {
        width: 300px;
        border-collapse: collapse;
    }
    TD, TH {
        padding: 3px;
        border: 1px solid black;
    }
    TH {
        background: cornflowerblue;
    }
</style>
<html>
<head>
    <title>Title</title>
</head>

<body>
<c:out value="${value}" />
<table>
    <tbody>
    <tr><th>Id</th><th>Author</th><th>Name</th><th>EditButton</th><th>DeleteButton</th></tr>
    <c:forEach items="${listBooks}" var="book">
        <tr>
            <td><c:out value="${book.id}" /></td>
            <td><c:out value="${book.author}" /></td>
            <td><c:out value="${book.name}" /></td>
            <form method="post" action="/books/edit/${book.id}"><td><button type="submit" >edit</button> </td></form>
            <td><form method="post" action="/books/delete/${book.id}"><button type="submit" >delete</button></form> </td>
        </tr>
    </c:forEach>
    </tbody>
</table>

</body>
</html>
