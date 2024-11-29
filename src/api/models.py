from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doc_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, doc_id, name, email, password):
        self.doc_id = doc_id
        self.name = name
        self.email = email
        self.password = password
        self.is_active = True

    def __repr__(self):
        return f'<User {self.doc_id}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "doc_id": self.doc_id,
            "name" : self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }