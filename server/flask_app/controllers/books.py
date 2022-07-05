from flask import request, jsonify
from flask_app import app
from flask_app.models import book

@app.route('/api/book/new', methods=['POST'])
def create_book():
    formData = request.get_json()

    data = {
        "title": formData["title"],
        "author": formData["author"]
    }

    book.Book.create_book(data)

    return jsonify(message = "Book successfully added")

@app.route('/api/books')
def dashboard():

    all_books = book.Book.get_all_books()

    return jsonify(all_books)

@app.route('/api/book/<int:id>')
def show_book(id):
    
    data = {
        "id": id,
    }

    one_book = book.Book.get_one_book(data)

    return  jsonify(one_book)

@app.route('/api/book/<int:id>/edit', methods = ['POST'])
def edit_book(id):
    formData = request.get_json()

    data = {
        "id": id,
        "title": formData["title"],
        "author": formData["author"]
    }

    book.Book.update_book(data)

    return jsonify(message = "Book successfully updated")

@app.route('/api/book/<int:id>/delete', methods = ['DELETE'])
def delete_book(id):

    data = {
        "id": id
    }

    book.Book.destroy_book(data)

    return jsonify(message = "Book successfully deleted")