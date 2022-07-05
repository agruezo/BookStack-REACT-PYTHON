from flask_app.config.mysqlconnection import connectToMySQL

class Book:

    db_name = "python_react"

    def __init__(self,data):
        self.id = data['id']
        self.title = data['title']
        self.author = data['author']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def create_book(cls,data):
        query = "INSERT into books (title, author) VALUES (%(title)s, %(author)s);"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        return results

    @classmethod
    def get_all_books(cls):
        query = "SELECT * FROM books"
        results = connectToMySQL(cls.db_name).query_db(query)
        return results

    @classmethod
    def get_one_book(cls,data):
        query = "SELECT * FROM books WHERE id = %(id)s"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        return results[0]

    @classmethod
    def update_book(cls,data):
        query = "UPDATE books SET title = %(title)s, author = %(author)s WHERE id = %(id)s"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        return results

    @classmethod
    def destroy_book(cls,data):
        query = "DELETE FROM books WHERE id = %(id)s"
        results = connectToMySQL(cls.db_name).query_db(query,data)
        return results