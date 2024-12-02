from flask import Blueprint, jsonify
from api.models import Sucursal

api = Blueprint('api', __name__)

@api.route('/sucursales', methods=['GET'])
def get_sucursales():
    sucursales = Sucursal.query.all()
    return jsonify([{"nombre": sucursal.nombre, "lat": sucursal.lat, "lon": sucursal.lon} for sucursal in sucursales])
