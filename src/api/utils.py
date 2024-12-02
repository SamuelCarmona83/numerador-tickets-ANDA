from flask import url_for

def generate_sitemap(app):
    # Función para generar el sitemap de todas las rutas
    sitemap = {"routes": []}
    for rule in app.url_map.iter_rules():
        sitemap["routes"].append({
            "endpoint": rule.endpoint,
            "url": url_for(rule.endpoint)
        })
    return jsonify(sitemap)
