from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from api.models import db, Sucursal

def setup_admin(app):
    admin = Admin(app, name="Sucursal Admin", template_mode="bootstrap3")
    admin.add_view(ModelView(Sucursal, db.session))
