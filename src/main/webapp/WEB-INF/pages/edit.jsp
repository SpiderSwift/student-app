<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<body>
<h2>Book info</h2>
<form:form method = "POST" action = "/editBook" id="bookForm">
    <table>
        <tr>
            <td><form:label path = "id">Id</form:label></td>
            <td><form:input path = "id" /></td>
        </tr>
        <tr>
            <td><form:label path = "name">Name</form:label></td>
            <td><form:input path = "name" /></td>
        </tr>
        <tr>
            <td><form:label path = "author">Author</form:label></td>
            <td><form:input path = "author" /></td>
        </tr>
        <tr>
            <td colspan = "2">
                <input type = "submit" value = "Submit"/>
            </td>
        </tr>
    </table>
</form:form>

</body>
</html>